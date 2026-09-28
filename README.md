# CET — Corporate Entrance Test

A national entrance-exam platform for Indian final-year students and recent
graduates. An initiative by **Startup Times**, operated by **Devobyte OPC
Private Limited**.

## Stack
- **Frontend:** React + React Router + Tailwind + shadcn/ui (Framer Motion, lucide-react)
- **Backend:** Node.js / Express + MongoDB (Mongoose), production feature-separated structure
- **Auth:** JWT (email or phone login), brute-force lockout
- **Payments:** Mock Razorpay/UPI (₹250 fee), placeholder-ready
- **Uploads:** Cloudinary (photo/signature/ID), local data-URI fallback when keys absent

## Structure
```
backend/   Node.js/Express API (src/config, models, controllers, routes,
           services, middleware, validators, utils, constants). See backend/README.md.
frontend/  React app (src/pages, components, layouts, services, hooks, context,
           constants, routes).
```
> Platform note: the Express app runs on an internal port and a thin FastAPI
> passthrough (`backend/server.py`) exposes it on port 8001 for the platform
> ingress. All application logic lives in Node/Express.

## Run
Both services are managed by supervisor and start automatically.
- Backend: `cd backend && yarn install` (env in `backend/.env`, see `.env.example`)
- Frontend: `cd frontend && yarn install` (env in `frontend/.env`, see `.env.example`)

## Pages
Home, About, How It Works, Program, Dubai Experience, Employers, FAQs, Blog,
Login, Apply for Exam (9-step form), Candidate Dashboard, Admin Dashboard,
Contact, Privacy Policy, Refund Policy, Terms & Conditions.

## Key flows
- Applying auto-creates a candidate login at step 1 and saves a draft on every step.
- Payment (₹250) precedes document upload, which precedes final submission.
- Admin panel: metrics, searchable/filterable applications, detail drawer, status updates.
