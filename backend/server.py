"""
Infrastructure supervisor + passthrough proxy.

The platform runs THIS file via supervisor on port 8001 (ingress-facing, resilient
across pod resumes). All application logic lives in the Node.js/Express backend
(backend/src/*). This module:
  1. Spawns and supervises the Node process on NODE_PORT.
  2. Proxies every /api request through to it.
It contains no business logic, database models, or routes of its own.
"""
import os
import sys
import signal
import atexit
import subprocess
from contextlib import asynccontextmanager
from pathlib import Path

import httpx
from fastapi import FastAPI, Request
from starlette.responses import Response, JSONResponse

ROOT_DIR = Path(__file__).parent
NODE_PORT = os.environ.get("NODE_PORT", "9000")
NODE_BACKEND = os.environ.get("NODE_BACKEND_URL", f"http://127.0.0.1:{NODE_PORT}")

_node_proc = None


def _start_node():
    global _node_proc
    if _node_proc and _node_proc.poll() is None:
        return
    env = os.environ.copy()
    env["NODE_PORT"] = NODE_PORT
    _node_proc = subprocess.Popen(
        ["node", "src/server.js"],
        cwd=str(ROOT_DIR),
        env=env,
        stdout=sys.stdout,
        stderr=sys.stderr,
    )


def _stop_node():
    global _node_proc
    if _node_proc and _node_proc.poll() is None:
        _node_proc.terminate()
        try:
            _node_proc.wait(timeout=10)
        except subprocess.TimeoutExpired:
            _node_proc.kill()


atexit.register(_stop_node)


@asynccontextmanager
async def lifespan(app: FastAPI):
    _start_node()
    yield
    _stop_node()


app = FastAPI(title="CET proxy", lifespan=lifespan)

_HOP_BY_HOP = {
    "content-length",
    "transfer-encoding",
    "content-encoding",
    "connection",
    "keep-alive",
    "host",
}


@app.api_route("/{full_path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])
async def proxy(full_path: str, request: Request):
    # respawn node if it died
    if not _node_proc or _node_proc.poll() is not None:
        _start_node()

    url = f"{NODE_BACKEND}/{full_path}"
    body = await request.body()
    fwd_headers = {k: v for k, v in request.headers.items() if k.lower() != "host"}

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            upstream = await client.request(
                request.method,
                url,
                content=body,
                headers=fwd_headers,
                params=request.query_params,
            )
    except httpx.ConnectError:
        return JSONResponse(
            status_code=503,
            content={"success": False, "message": "Backend starting, please retry."},
        )

    resp = Response(content=upstream.content, status_code=upstream.status_code)
    for key, value in upstream.headers.multi_items():
        if key.lower() in _HOP_BY_HOP:
            continue
        resp.raw_headers.append((key.encode("latin-1"), value.encode("latin-1")))
    return resp
