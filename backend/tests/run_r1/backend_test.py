"""Regression coverage for CET candidate registration, application, payment, uploads, and admin APIs."""
import os
import time
import uuid

import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if BASE_URL:
    BASE_URL = BASE_URL.rstrip("/")


@pytest.fixture(scope="session")
def api():
    if not BASE_URL:
        pytest.skip("REACT_APP_BACKEND_URL is not exported in the test environment")
    session = requests.Session()
    return session


@pytest.fixture(scope="session")
def candidate(api):
    stamp = uuid.uuid4().hex[:12]
    payload = {
        "fullName": "TEST_r1 Candidate",
        "email": f"test_r1_{stamp}@example.com",
        "phone": f"9{''.join(str(ord(c) % 10) for c in stamp[:9])}",
        "password": "test1234",
    }
    response = api.post(f"{BASE_URL}/api/auth/register", json=payload)
    assert response.status_code == 201, response.text
    body = response.json()
    assert body["success"] is True
    assert isinstance(body["data"]["token"], str)
    assert body["data"]["applicationNumber"]
    return {"payload": payload, "token": body["data"]["token"], "data": body["data"]}


@pytest.fixture
def candidate_api(api, candidate):
    api.headers.update({"Authorization": f"Bearer {candidate['token']}"})
    return api


class TestCandidateApplicationFlow:
    """Test account creation, draft autosave, payment gate, uploads, and submission."""

    def test_register_auto_creates_draft(self, candidate):
        assert candidate["data"]["candidate"]["email"] == candidate["payload"]["email"]
        assert candidate["data"]["candidate"]["role"] == "candidate"
        assert "passwordHash" not in candidate["data"]["candidate"]

    def test_duplicate_email_is_conflict(self, api, candidate):
        payload = {**candidate["payload"], "phone": "9888888888"}
        response = api.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response.status_code == 409
        assert "already exists" in response.json()["message"].lower()

    def test_duplicate_phone_is_conflict(self, api, candidate):
        payload = {**candidate["payload"], "email": "unique_r1_phone@example.com"}
        response = api.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response.status_code == 409
        assert "already exists" in response.json()["message"].lower()

    def test_login_by_email_and_phone(self, api, candidate):
        for identifier in (candidate["payload"]["email"], candidate["payload"]["phone"]):
            response = api.post(
                f"{BASE_URL}/api/auth/login",
                json={"identifier": identifier, "password": candidate["payload"]["password"]},
            )
            assert response.status_code == 200, response.text
            assert response.json()["data"]["candidate"]["email"] == candidate["payload"]["email"]

    def test_me_and_draft_are_available(self, candidate_api, candidate):
        me = candidate_api.get(f"{BASE_URL}/api/auth/me")
        assert me.status_code == 200
        assert me.json()["data"]["email"] == candidate["payload"]["email"]
        application = candidate_api.get(f"{BASE_URL}/api/applications/me")
        assert application.status_code == 200
        data = application.json()["data"]
        assert data["applicationNumber"] == candidate["data"]["applicationNumber"]
        assert data["status"] == "draft"
        assert data["currentStep"] == 2

    def test_partial_autosave_persists_sections_and_step(self, candidate_api):
        payload = {
            "personal": {"dateOfBirth": "2000-01-02", "gender": "Other"},
            "academic": {"college": "TEST r1 College", "course": "MBA"},
            "address": {"city": "Delhi", "pincode": "110001"},
            "preferences": {"examCity": "Delhi", "interviewMode": "Virtual"},
            "declarations": {"infoAccurate": True, "termsAccepted": True},
            "currentStep": 7,
        }
        response = candidate_api.patch(f"{BASE_URL}/api/applications/me", json=payload)
        assert response.status_code == 200, response.text
        data = response.json()["data"]
        assert data["academic"]["college"] == "TEST r1 College"
        assert data["currentStep"] == 7
        fetched = candidate_api.get(f"{BASE_URL}/api/applications/me")
        assert fetched.status_code == 200
        assert fetched.json()["data"]["declarations"]["termsAccepted"] is True

    def test_submit_requires_payment(self, candidate_api):
        response = candidate_api.post(f"{BASE_URL}/api/applications/me/submit")
        assert response.status_code == 403
        assert "payment" in response.json()["message"].lower()

    def test_documents_are_blocked_before_payment(self, candidate_api):
        files = {"photo": ("photo.jpg", b"test photo", "image/jpeg")}
        response = candidate_api.post(f"{BASE_URL}/api/applications/me/documents", files=files)
        assert response.status_code == 403
        assert "payment" in response.json()["message"].lower()

    def test_create_order_has_inr_250_fee(self, candidate_api):
        response = candidate_api.post(f"{BASE_URL}/api/payments/create-order")
        assert response.status_code == 200, response.text
        data = response.json()["data"]
        assert data["amount"] == 250
        assert data["currency"] == "INR"

    def test_verify_marks_application_paid(self, candidate_api):
        order = candidate_api.post(f"{BASE_URL}/api/payments/create-order").json()["data"]
        response = candidate_api.post(
            f"{BASE_URL}/api/payments/verify",
            json={"orderId": order["orderId"], "paymentId": "pay_TEST_r1", "method": "upi"},
        )
        assert response.status_code == 200, response.text
        data = response.json()["data"]
        assert data["payment"]["status"] == "paid"
        assert data["payment"]["amount"] == 250
        assert data["status"] == "paid"

    def test_upload_documents_after_payment_uses_data_uri_fallback(self, candidate_api):
        files = {
            "photo": ("photo.jpg", b"test photo", "image/jpeg"),
            "signature": ("signature.png", b"test signature", "image/png"),
        }
        response = candidate_api.post(f"{BASE_URL}/api/applications/me/documents", files=files)
        assert response.status_code == 200, response.text
        data = response.json()["data"]
        assert data["documents"]["photo"]["url"].startswith("data:image/jpeg;base64,")
        assert data["documents"]["signature"]["url"].startswith("data:image/png;base64,")

    def test_submit_after_requirements_succeeds(self, candidate_api):
        response = candidate_api.post(f"{BASE_URL}/api/applications/me/submit")
        assert response.status_code == 200, response.text
        data = response.json()["data"]
        assert data["status"] == "submitted"
        assert data["currentStep"] == 9
        assert data["submittedAt"]


class TestAdminAndAccess:
    """Test role restrictions and admin dashboard endpoints."""

    @pytest.fixture(scope="class")
    def admin_token(self, api):
        response = api.post(
            f"{BASE_URL}/api/auth/admin/login",
            json={"email": "corporateentrancetest@gmail.com", "password": "CetAdmin@2027"},
        )
        assert response.status_code == 200, response.text
        data = response.json()["data"]
        assert data["admin"]["email"] == "corporateentrancetest@gmail.com"
        return data["token"]

    @pytest.fixture
    def admin_api(self, api, admin_token):
        api.headers.update({"Authorization": f"Bearer {admin_token}"})
        return api

    def test_candidate_cannot_access_admin(self, candidate_api):
        response = candidate_api.get(f"{BASE_URL}/api/admin/stats")
        assert response.status_code == 403

    def test_admin_stats_and_application_search(self, admin_api, candidate):
        stats = admin_api.get(f"{BASE_URL}/api/admin/stats")
        assert stats.status_code == 200
        assert isinstance(stats.json()["data"]["totalApplications"], int)
        listing = admin_api.get(
            f"{BASE_URL}/api/admin/applications",
            params={"search": candidate["data"]["applicationNumber"], "limit": 5},
        )
        assert listing.status_code == 200
        data = listing.json()["data"]
        assert data["total"] >= 1
        assert any(row["applicationNumber"] == candidate["data"]["applicationNumber"] for row in data["items"])
        app_id = next(row["_id"] for row in data["items"] if row["applicationNumber"] == candidate["data"]["applicationNumber"])
        detail = admin_api.get(f"{BASE_URL}/api/admin/applications/{app_id}")
        assert detail.status_code == 200
        assert detail.json()["data"]["applicationNumber"] == candidate["data"]["applicationNumber"]
        updated = admin_api.patch(f"{BASE_URL}/api/admin/applications/{app_id}/status", json={"status": "submitted"})
        assert updated.status_code == 200
        assert updated.json()["data"]["status"] == "submitted"

    def test_admin_payments_endpoint(self, admin_api):
        response = admin_api.get(f"{BASE_URL}/api/admin/payments")
        assert response.status_code == 200
        assert isinstance(response.json()["data"], list)
    def test_invalid_application_id_returns_4xx(self, admin_api):
        response = admin_api.get(f"{BASE_URL}/api/admin/applications/not-a-valid-object-id")
        assert response.status_code in (400, 404)



def test_public_payment_config(api):
    response = api.get(f"{BASE_URL}/api/payments/config")
    assert response.status_code == 200
    assert response.json()["data"] == {"amount": 250, "currency": "INR", "gateway": "razorpay-mock"}
