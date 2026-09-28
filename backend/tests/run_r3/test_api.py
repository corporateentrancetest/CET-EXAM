"""Run r3 API regression tests for candidate application, payments, and admin flows."""
import os
import time
from pathlib import Path

import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def candidate(api):
    stamp = str(int(time.time() * 1000))
    payload = {
        "fullName": f"TEST_r3 Candidate {stamp}",
        "email": f"TEST_r3_{stamp}@example.com",
        "phone": f"987{stamp[-7:]}",
        "password": "TestR3Pass!234",
    }
    r = api.post(f"{BASE_URL}/api/auth/register", json=payload)
    assert r.status_code == 201, r.text
    body = r.json()
    assert body.get("success") is True
    assert body["data"]["token"]
    assert body["data"]["applicationNumber"]
    token = body["data"]["token"]
    api.headers.update({"Authorization": f"Bearer {token}"})
    return {"payload": payload, "token": token, "application": body["data"]}


def test_health_and_payment_config(api):
    health = api.get(f"{BASE_URL}/api/health")
    assert health.status_code == 200 and health.json()["status"] == "ok"
    config = api.get(f"{BASE_URL}/api/payments/config")
    assert config.status_code == 200
    assert config.json()["data"] == {"amount": 250, "currency": "INR", "gateway": "razorpay-mock"}


def test_duplicate_email_and_phone_are_rejected(api, candidate):
    p = candidate["payload"]
    same_email = {**p, "phone": "9870000001"}
    same_phone = {**p, "email": "other-r3@example.com"}
    for payload in (same_email, same_phone):
        r = api.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert r.status_code == 409, r.text
        assert "already exists" in r.json().get("message", "").lower()


def test_candidate_login_by_email_and_phone_and_me(api, candidate):
    p = candidate["payload"]
    for identifier in (p["email"], p["phone"]):
        r = api.post(f"{BASE_URL}/api/auth/login", json={"identifier": identifier, "password": p["password"]})
        assert r.status_code == 200, r.text
        data = r.json()["data"]
        assert data["candidate"]["email"] == p["email"].lower()
        assert data["token"]
        api.headers.update({"Authorization": f"Bearer {data['token']}"})
    me = api.get(f"{BASE_URL}/api/auth/me")
    assert me.status_code == 200
    assert me.json()["data"]["email"] == p["email"].lower()
    assert me.json()["data"]["role"] == "candidate"


def test_draft_get_patch_and_persistence(api, candidate):
    initial = api.get(f"{BASE_URL}/api/applications/me")
    assert initial.status_code == 200
    app = initial.json()["data"]
    assert app["applicationNumber"] == candidate["application"]["applicationNumber"]
    patch = {
        "personal": {"dateOfBirth": "2001-02-03", "gender": "female"},
        "academic": {"college": "TEST_r3 College", "course": "MBA"},
        "address": {"city": "Mumbai", "pincode": "400001"},
        "preferences": {"examCity": "Mumbai", "interviewMode": "Virtual"},
        "declarations": {"infoAccurate": True, "termsAccepted": True},
        "currentStep": 7,
    }
    updated = api.patch(f"{BASE_URL}/api/applications/me", json=patch)
    assert updated.status_code == 200, updated.text
    body = updated.json()["data"]
    assert body["personal"]["dateOfBirth"] == "2001-02-03"
    assert body["academic"]["college"] == "TEST_r3 College"
    assert body["currentStep"] == 7
    fetched = api.get(f"{BASE_URL}/api/applications/me")
    assert fetched.status_code == 200
    fetched = fetched.json()["data"]
    assert fetched["address"]["city"] == "Mumbai"
    assert fetched["preferences"]["examCity"] == "Mumbai"
    assert fetched["declarations"]["termsAccepted"] is True


def test_documents_blocked_before_payment_and_submit_blocked(api, candidate):
    # New candidate is unpaid; document upload must be blocked before touching files.
    r = api.post(
        f"{BASE_URL}/api/applications/me/documents",
        files={"photo": ("photo.jpg", b"fake-jpg", "image/jpeg"), "signature": ("sig.jpg", b"fake-jpg", "image/jpeg")},
        headers={"Content-Type": None},
    )
    assert r.status_code == 403, r.text
    submit = api.post(f"{BASE_URL}/api/applications/me/submit")
    assert submit.status_code == 403, submit.text


def test_mock_payment_marks_application_paid(api, candidate):
    order = api.post(f"{BASE_URL}/api/payments/create-order")
    assert order.status_code == 200, order.text
    order_data = order.json()["data"]
    assert order_data["amount"] == 250
    assert order_data["currency"] == "INR"
    verify = api.post(
        f"{BASE_URL}/api/payments/verify",
        json={"orderId": order_data["orderId"], "paymentId": "TEST_r3_pay_001", "method": "upi"},
    )
    assert verify.status_code == 200, verify.text
    paid = verify.json()["data"]
    assert paid["payment"]["status"] == "paid"
    assert paid["payment"]["amount"] == 250
    assert paid["status"] == "paid"


def test_documents_after_payment_and_submit(api, candidate):
    r = api.post(
        f"{BASE_URL}/api/applications/me/documents",
        files={
            "photo": ("photo.jpg", b"fake-jpg-data", "image/jpeg"),
            "signature": ("signature.png", b"fake-signature-data", "image/png"),
        },
        headers={"Content-Type": None},
    )
    assert r.status_code == 200, r.text
    app = r.json()["data"]
    assert app["documents"]["photo"]["url"].startswith("data:image/jpeg")
    assert app["documents"]["signature"]["url"].startswith("data:image/png")
    submit = api.post(f"{BASE_URL}/api/applications/me/submit")
    assert submit.status_code == 200, submit.text
    final = submit.json()["data"]
    assert final["status"] == "submitted"
    assert final["currentStep"] == 9


def test_candidate_cannot_access_admin(api, candidate):
    for method, path in (("get", "/api/admin/stats"), ("get", "/api/admin/applications"), ("get", "/api/admin/payments")):
        r = getattr(api, method)(f"{BASE_URL}{path}")
        assert r.status_code == 403, r.text


@pytest.fixture(scope="module")
def admin(api):
    # Use documented admin credentials from /app/memory/test_credentials.md.
    r = api.post(
        f"{BASE_URL}/api/auth/admin/login",
        json={"email": "corporateentrancetest@gmail.com", "password": "CetAdmin@2027"},
    )
    assert r.status_code == 200, r.text
    data = r.json()["data"]
    assert data["token"]
    api.headers.update({"Authorization": f"Bearer {data['token']}"})
    return data


def test_admin_endpoints_and_filtering(api, admin, candidate):
    stats = api.get(f"{BASE_URL}/api/admin/stats")
    assert stats.status_code == 200
    assert isinstance(stats.json()["data"]["totalApplications"], int)
    listed = api.get(f"{BASE_URL}/api/admin/applications", params={"search": candidate["application"]["applicationNumber"], "limit": 5})
    assert listed.status_code == 200, listed.text
    data = listed.json()["data"]
    assert data["total"] >= 1
    assert any(row["applicationNumber"] == candidate["application"]["applicationNumber"] for row in data["items"])
    app_id = next(row["_id"] for row in data["items"] if row["applicationNumber"] == candidate["application"]["applicationNumber"])
    detail = api.get(f"{BASE_URL}/api/admin/applications/{app_id}")
    assert detail.status_code == 200
    assert detail.json()["data"]["applicationNumber"] == candidate["application"]["applicationNumber"]
    invalid = api.patch(f"{BASE_URL}/api/admin/applications/{app_id}/status", json={"status": "bogus"})
    assert invalid.status_code == 400
    status = api.patch(f"{BASE_URL}/api/admin/applications/{app_id}/status", json={"status": "submitted"})
    assert status.status_code == 200
    payments = api.get(f"{BASE_URL}/api/admin/payments")
    assert payments.status_code == 200
    assert isinstance(payments.json()["data"], list)



def test_admin_invalid_application_id_returns_client_error(api, admin):
    response = api.get(f"{BASE_URL}/api/admin/applications/not-a-valid-object-id")
    assert response.status_code in (400, 404), response.text



def test_login_bruteforce_observation(api, candidate):
    payload = candidate["payload"]
    failures = []
    for _ in range(5):
        response = api.post(
            f"{BASE_URL}/api/auth/login",
            json={"identifier": payload["email"], "password": "wrong-r3-password"},
        )
        failures.append(response.status_code)
    valid = api.post(
        f"{BASE_URL}/api/auth/login",
        json={"identifier": payload["email"], "password": payload["password"]},
    )
    assert failures == [401] * 5
    assert valid.status_code == 200
