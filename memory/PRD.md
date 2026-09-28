# CET (Corporate Entrance Test) — PRD

## Original problem statement
Build a professional, multi-page website for CET — a national entrance exam
platform for Indian final-year students / recent graduates, organized by Startup
Times (legal entity: Devobyte OPC Private Limited). Must feel like a credible
national examination body (UPSC/CAT-style). Production, feature-separated code
structure (no single-file app). Node.js/Express backend, React frontend.

## User choices / overrides
- Backend: **Node.js/Express** (exactly as briefed) + MongoDB.
- Auth: **JWT custom** (email or phone login).
- Payment: **mock Razorpay/UPI**, fee overridden to **₹250** (was ₹499 in copy).
- Uploads: **Cloudinary** (local data-URI fallback until keys provided).
- **Detailed admin panel** required.
- **Auto-account + auto-save drafts:** entering name/email/phone/password at step 1
  auto-creates a candidate login + draft; duplicate email/phone is rejected;
  partial data persists on every step.
- **Form order:** basic details → PAYMENT → document upload (photo/signature after payment) → submit.
- Legal entity **Devobyte OPC Private Limited** + email **help@corporateentrancetest.com**
  in footer, Contact, Privacy, Refund, Terms pages (for payment-gateway approval).

## Architecture
- `backend/server.py` — FastAPI passthrough on :8001 (ingress), spawns + proxies Node on :9000.
- `backend/src/` — config / models / controllers / routes / services / middleware / validators / utils / constants.
- Models: Candidate, Admin, Application, Payment (+ LoginAttempt for brute-force).
- `frontend/src/` — pages / components (common, layout, home, auth, application-form) / layouts / services / hooks / context / constants / routes.

## Personas
- Candidate (applies, pays, uploads, tracks status).
- Admin (corporateentrancetest@gmail.com) — reviews applications, stats, updates status.

## Implemented (2026-06)
- All 9+ public pages with verbatim copy + 4 legal pages, responsive, matches reference design.
- Sticky navy nav, amber CTAs, stat bar, 6-step journey, fee/key-dates/exam-pattern/timeline tables, FAQ accordion, countdown timer, Dubai dark section, founder note.
- Full 9-step application form with auto-register, per-step autosave, payment-before-documents ordering, mock payment, document upload (photo/signature required), review + submit + success receipt.
- Candidate dashboard (status badge, application summary, key dates).
- Detailed admin dashboard (metrics, searchable/filterable paginated table, detail drawer, status update).
- JWT auth (email/phone), brute-force lockout, admin seeding, centralized errors, consistent API envelope.
- Verified end-to-end via testing agent (0 frontend bugs) + curl. Hardening fixes: malformed-id→400, tightened CORS, brute-force 429.

## Backlog / not yet done
- P1: Real Razorpay live keys + signature verification; Cloudinary live keys.
- P1: HttpOnly-cookie auth option; admit-card PDF generation.
- P2: Employer registration portal; blog CMS + real articles; OTP login; email notifications (Resend).
- P2: DTO layer to hide Mongo _id (admin UI currently keys off _id).

## Next tasks
- Provide/confirm bracketed placeholders (syllabus weightage %, Top-100 %, Top-100 date).
- Wire live payment + storage keys when available.
