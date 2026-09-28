# CET — Corporate Entrance Test (Backend)

Node.js / Express + MongoDB (Mongoose) backend for the CET platform, organised
in a production, feature-separated structure.

## Architecture
```
src/
├── config/       # env, db, cloudinary configuration
├── constants/    # shared enums/constants
├── models/       # Mongoose schemas (Candidate, Admin, Application, Payment)
├── controllers/  # HTTP request/response handlers (call services)
├── routes/       # route definitions only
├── services/     # business logic (auth, email, upload, payment)
├── middleware/   # auth, admin gating, error handling, uploads
├── validators/   # express-validator request schemas
├── utils/        # token, OTP, application number, response helpers
├── app.js        # express app assembly
└── server.js     # db connect + admin seed + listen
```

> The platform ingress terminates on port 8001, served by a thin FastAPI
> passthrough (`server.py`) that spawns and proxies to this Node service on
> `NODE_PORT`. All business logic lives here in Node/Express.

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. `yarn install`
3. `yarn start` (or it is auto-started/proxied by the platform).

## Key environment variables
See `.env.example`. Secrets (JWT, admin, Cloudinary) are never hardcoded.

## API surface (all under `/api`)
- `POST /auth/register` – create candidate + start draft application
- `POST /auth/login` – candidate login (email or phone)
- `POST /auth/admin/login` – admin login
- `GET  /auth/me` – current session
- `GET  /candidates/me` – profile + application
- `GET  /applications/me` – get draft/application
- `PATCH /applications/me` – autosave partial draft
- `POST /applications/me/documents` – upload photo/signature/ID (post-payment)
- `POST /applications/me/submit` – final submission
- `GET  /payments/config` – fee/gateway info
- `POST /payments/create-order` – create mock Razorpay order
- `POST /payments/verify` – verify + mark paid
- `GET  /admin/stats` – dashboard metrics
- `GET  /admin/applications` – list (filter/search/paginate)
- `GET  /admin/applications/:id` – detail
- `PATCH /admin/applications/:id/status` – update status
- `GET  /admin/payments` – payments list
