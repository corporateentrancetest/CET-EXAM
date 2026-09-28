"""Regression coverage for candidate registration, application lifecycle, payments and admin APIs."""
import os
import time
from pathlib import Path

import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")


@pytest.fixture(scope="session")
def candidate_session():
    stamp = str(int(time.time() * 1000))[-8:]
    payload = {
        "fullName": "TEST_r2 Candidate",
        "email": f"test_r2_{stamp}@example.com",
        "phone": f"98{stamp[-8:]}",
        "password": "TestR2Pass123",
    }
    response = requests.post(f"{BASE_URL}/api/auth/register", json=payload, timeout=30)
    assert response.status_code == 201, response.text
    body = response.json()
    assert body["success"] is True
    assert body["data"]["token"]
    assert body["data"]["applicationNumber"]
    session = requests.Session()
    session.headers.update({"Authorization": f"Bearer {body['data']['token']}"})
    return {"session": session, "payload": payload, "body": body}


@pytest.fixture(scope="session")
def admin_session():
    response = requests.post(
        f"{BASE_URL}/api/auth/admin/login",
        json={"email": "corporateentrancetest@gmail.com", "password": "CetAdmin@2027"},
        timeout=30,
    )
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["success"] is True
    session = requests.Session()
    session.headers.update({"Authorization": f"Bearer {body['data']['token']}"})
    return {"session": session, "body": body}


def test_duplicate_registration_by_email_and_phone(candidate_session):
    payload = candidate_session["payload"]
    by_email = {**payload, "phone": "9876543210"}
    response = requests.post(f"{BASE_URL}/api/auth/register", json=by_email, timeout=30)
    assert response.status_code == 409
    assert "already exists" in response.json()["message"].lower()

    by_phone = {**payload, "email": "other_r2_duplicate@example.com"}
    response = requests.post(f"{BASE_URL}/api/auth/register", json=by_phone, timeout=30)
    assert response.status_code == 409
    assert "already exists" in response.json()["message"].lower()


def test_candidate_login_with_email_and_phone(candidate_session):
    payload = candidate_session["payload"]
    for identifier in (payload["email"], payload["phone"]):
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"identifier": identifier, "password": payload["password"]},
            timeout=30,
        )
        assert response.status_code == 200, response.text
        body = response.json()
        assert body["data"]["candidate"]["email"] == payload["email"]
        assert body["data"]["token"]


def test_me_and_draft_persistence(candidate_session):
    session = candidate_session["session"]
    response = session.get(f"{BASE_URL}/api/auth/me", timeout=30)
    assert response.status_code == 200
    me = response.json()["data"]
    assert me["email"] == candidate_session["payload"]["email"]
    assert me["role"] == "candidate"
    assert "passwordHash" not in me

    response = session.get(f"{BASE_URL}/api/applications/me", timeout=30)
    assert response.status_code == 200
    app = response.json()["data"]
    assert app["status"] == "draft"
    assert app["contact"]["email"] == candidate_session["payload"]["email"]
    assert app["currentStep"] == 2

    patch = {
        "personal": {"dateOfBirth": "2001-04-05", "gender": "Female", "category": "General"},
        "academic": {"college": "TEST_r2 College", "course": "MBA", "graduationYear": "2027"},
        "address": {"line1": "1 Test Street", "city": "Delhi", "state": "Delhi", "pincode": "110001"},
        "preferences": {"examCity": "Delhi", "interviewMode": "Virtual"},
        "declarations": {"infoAccurate": True, "termsAccepted": True},
        "currentStep": 7,
    }
    response = session.patch(f"{BASE_URL}/api/applications/me", json=patch, timeout=30)
    assert response.status_code == 200, response.text
    assert response.json()["data"]["currentStep"] == 7

    response = session.get(f"{BASE_URL}/api/applications/me", timeout=30)
    persisted = response.json()["data"]
    assert persisted["academic"]["college"] == "TEST_r2 College"
    assert persisted["address"]["pincode"] == "110001"
    assert persisted["preferences"]["interviewMode"] == "Virtual"
    assert persisted["declarations"]["termsAccepted"] is True


def test_payment_and_document_order(candidate_session):
    session = candidate_session["session"]
    response = session.post(f"{BASE_URL}/api/applications/me/documents", files={
        "photo": ("photo.jpg", b"photo-bytes", "image/jpeg"),
        "signature": ("signature.jpg", b"signature-bytes", "image/jpeg"),
    }, timeout=30)
    assert response.status_code == 403
    assert "payment" in response.json()["message"].lower()

    response = session.post(f"{BASE_URL}/api/applications/me/submit", timeout=30)
    assert response.status_code == 403

    response = session.post(f"{BASE_URL}/api/payments/create-order", timeout=30)
    assert response.status_code == 200, response.text
    order = response.json()["data"]
    assert order["amount"] == 250
    assert order["amountPaise"] == 25000
    assert order["currency"] == "INR"

    response = session.post(
        f"{BASE_URL}/api/payments/verify",
        json={"orderId": order["orderId"], "paymentId": "pay_r2_mock", "method": "upi"},
        timeout=30,
    )
    assert response.status_code == 200, response.text
    paid = response.json()["data"]
    assert paid["payment"]["status"] == "paid"
    assert paid["status"] == "paid"

    response = session.post(f"{BASE_URL}/api/applications/me/documents", files={
        "photo": ("photo.jpg", b"photo-bytes", "image/jpeg"),
        "signature": ("signature.jpg", b"signature-bytes", "image/jpeg"),
    }, timeout=30)
    assert response.status_code == 200, response.text
    docs = response.json()["data"]["documents"]
    assert docs["photo"]["url"].startswith("data:image/jpeg;base64,")
    assert docs["signature"]["url"].startswith("data:image/jpeg;base64,")


def test_submit_after_payment_documents_and_declarations(candidate_session):
    response = candidate_session["session"].post(f"{BASE_URL}/api/applications/me/submit", timeout=30)
    assert response.status_code == 200, response.text
    data = response.json()["data"]
    assert data["status"] == "submitted"
    assert data["currentStep"] == 9
    assert data["submittedAt"]


def test_admin_access_and_crud(admin_session, candidate_session):
    admin = admin_session["session"]
    candidate = candidate_session["session"]
    response = candidate.get(f"{BASE_URL}/api/admin/stats", timeout=30)
    assert response.status_code == 403

    response = admin.get(f"{BASE_URL}/api/admin/stats", timeout=30)
    assert response.status_code == 200
    stats = response.json()["data"]
    for key in ("totalCandidates", "totalApplications", "drafts", "submitted", "paidCount", "revenue", "byStatus"):
        assert key in stats

    response = admin.get(f"{BASE_URL}/api/admin/applications", params={"limit": 5, "search": "TEST_r2"}, timeout=30)
    assert response.status_code == 200
    listing = response.json()["data"]
    assert listing["limit"] == 5
    assert listing["page"] == 1
    assert isinstance(listing["items"], list)
    assert listing["total"] >= 1
    application = next(item for item in listing["items"] if item["contact"]["email"] == candidate_session["payload"]["email"])

    response = admin.get(f"{BASE_URL}/api/admin/applications/{application['_id']}", timeout=30)
    assert response.status_code == 200
    assert response.json()["data"]["applicationNumber"] == application["applicationNumber"]

    response = admin.patch(
        f"{BASE_URL}/api/admin/applications/{application['_id']}/status",
        json={"status": "submitted"},
        timeout=30,
    )
    assert response.status_code == 200
    assert response.json()["data"]["status"] == "submitted"

    response = admin.get(f"{BASE_URL}/api/admin/payments", timeout=30)
    assert response.status_code == 200
    assert isinstance(response.json()["data"], list)


def test_admin_login_and_payment_config():
    response = requests.get(f"{BASE_URL}/api/payments/config", timeout=30)
    assert response.status_code == 200
    data = response.json()["data"]
    assert data == {"amount": 250, "currency": "INR", "gateway": "razorpay-mock"}

    response = requests.post(
        f"{BASE_URL}/api/auth/admin/login",
        json={"email": "corporateentrancetest@gmail.com", "password": "CetAdmin@2027"},
        timeout=30,
    )
    assert response.status_code == 200
    assert response.json()["data"]["admin"]["role"] == "admin"
    assert response.json()["data"]["token"]



def test_admin_invalid_application_id_is_client_error(admin_session):
    admin = admin_session["session"]
    response = admin.get(f"{BASE_URL}/api/admin/applications/not-a-valid-object-id", timeout=30)
    assert response.status_code == 404

    response = admin.patch(
        f"{BASE_URL}/api/admin/applications/not-a-valid-object-id/status",
        json={"status": "submitted"},
        timeout=30,
    )
    assert response.status_code == 404
