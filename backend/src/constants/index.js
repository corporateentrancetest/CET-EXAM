/** Shared application constants (single source of truth). */

const ROLES = Object.freeze({
  CANDIDATE: "candidate",
  ADMIN: "admin",
});

const APPLICATION_STATUS = Object.freeze({
  DRAFT: "draft",
  PAYMENT_PENDING: "payment_pending",
  PAID: "paid",
  SUBMITTED: "submitted",
});

const PAYMENT_STATUS = Object.freeze({
  CREATED: "created",
  PAID: "paid",
  FAILED: "failed",
});

// Multi-step form sections (order matters — payment sits before document upload)
const FORM_STEPS = Object.freeze([
  "account",
  "personal",
  "academic",
  "address",
  "preferences",
  "declarations",
  "payment",
  "documents",
  "review",
]);

const COLLECTIONS = Object.freeze({
  CANDIDATES: "candidates",
  ADMINS: "admins",
  APPLICATIONS: "applications",
  PAYMENTS: "payments",
});

module.exports = { ROLES, APPLICATION_STATUS, PAYMENT_STATUS, FORM_STEPS, COLLECTIONS };
