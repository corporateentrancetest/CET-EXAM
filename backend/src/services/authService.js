const bcrypt = require("bcryptjs");
const Candidate = require("../models/Candidate");
const Admin = require("../models/Admin");
const Application = require("../models/Application");
const { generateToken } = require("../utils/generateToken");
const generateApplicationNumber = require("../utils/generateApplicationNumber");
const { ROLES, APPLICATION_STATUS } = require("../constants");
const { assertNotLocked, recordFailure, clearAttempts } = require("../utils/bruteForce");
const env = require("../config/env");

/** Simple typed error that controllers translate into HTTP status codes. */
class ServiceError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

async function hashPassword(plain) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

/**
 * Register a candidate from the first form step (name/email/phone/password).
 * A draft application is auto-created so the account "exists" the moment the
 * basics are entered. Duplicate email OR phone is rejected.
 */
async function registerCandidate({ fullName, email, phone, password }) {
  const normalizedEmail = email.toLowerCase().trim();
  const existing = await Candidate.findOne({
    $or: [{ email: normalizedEmail }, { phone: phone.trim() }],
  });
  if (existing) {
    const which = existing.email === normalizedEmail ? "email" : "phone number";
    throw new ServiceError(
      409,
      `An account with this ${which} already exists. Please log in to continue your application.`
    );
  }

  const passwordHash = await hashPassword(password);
  const candidate = await Candidate.create({
    fullName: fullName.trim(),
    email: normalizedEmail,
    phone: phone.trim(),
    passwordHash,
  });

  const application = await Application.create({
    candidate: candidate._id,
    applicationNumber: generateApplicationNumber(2027),
    personal: { fullName: candidate.fullName },
    contact: { email: candidate.email, phone: candidate.phone },
    status: APPLICATION_STATUS.DRAFT,
    currentStep: 2,
  });

  const token = generateToken({ id: candidate._id.toString(), role: ROLES.CANDIDATE });
  return { token, candidate: candidate.toSafeJSON(), applicationNumber: application.applicationNumber };
}

/** Candidate login using email OR phone as the identifier. */
async function loginCandidate({ identifier, password }) {
  const id = identifier.toLowerCase().trim();
  await assertNotLocked(`cand:${id}`, ServiceError);
  const candidate = await Candidate.findOne({
    $or: [{ email: id }, { phone: identifier.trim() }],
  });
  if (!candidate) {
    await recordFailure(`cand:${id}`);
    throw new ServiceError(401, "No account found. Please check your details or apply first.");
  }

  const ok = await bcrypt.compare(password, candidate.passwordHash);
  if (!ok) {
    await recordFailure(`cand:${id}`);
    throw new ServiceError(401, "Incorrect password. Please try again.");
  }

  await clearAttempts(`cand:${id}`);
  const token = generateToken({ id: candidate._id.toString(), role: ROLES.CANDIDATE });
  return { token, candidate: candidate.toSafeJSON() };
}

/** Admin login (separate collection). */
async function loginAdmin({ email, password }) {
  const key = `admin:${email.toLowerCase().trim()}`;
  await assertNotLocked(key, ServiceError);
  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    await recordFailure(key);
    throw new ServiceError(401, "Invalid admin credentials.");
  }
  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) {
    await recordFailure(key);
    throw new ServiceError(401, "Invalid admin credentials.");
  }
  await clearAttempts(key);
  const token = generateToken({ id: admin._id.toString(), role: ROLES.ADMIN });
  return { token, admin: admin.toSafeJSON() };
}

/** Idempotent admin seeding from env. Creates or updates the admin password. */
async function seedAdmin() {
  if (!env.admin.email || !env.admin.password) {
    console.warn("[seed] ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping admin seed");
    return;
  }
  const existing = await Admin.findOne({ email: env.admin.email });
  const passwordHash = await hashPassword(env.admin.password);
  if (!existing) {
    await Admin.create({ name: env.admin.name, email: env.admin.email, passwordHash });
    console.log(`[seed] admin created: ${env.admin.email}`);
  } else {
    const same = await bcrypt.compare(env.admin.password, existing.passwordHash);
    if (!same) {
      existing.passwordHash = passwordHash;
      await existing.save();
      console.log(`[seed] admin password updated: ${env.admin.email}`);
    }
  }
}

module.exports = {
  ServiceError,
  hashPassword,
  registerCandidate,
  loginCandidate,
  loginAdmin,
  seedAdmin,
};
