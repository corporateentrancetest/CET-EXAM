const mongoose = require("mongoose");

/** Tracks failed login attempts per identifier for brute-force protection. */
const loginAttemptSchema = new mongoose.Schema(
  {
    identifier: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
  },
  { timestamps: true, collection: "login_attempts" }
);

const LoginAttempt = mongoose.model("LoginAttempt", loginAttemptSchema);

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

/** Throws a 429 ServiceError if the identifier is currently locked. */
async function assertNotLocked(identifier, ServiceError) {
  const rec = await LoginAttempt.findOne({ identifier });
  if (rec && rec.lockUntil && rec.lockUntil > new Date()) {
    const mins = Math.ceil((rec.lockUntil - new Date()) / 60000);
    throw new ServiceError(429, `Too many failed attempts. Try again in ${mins} minute(s).`);
  }
}

async function recordFailure(identifier) {
  const rec = await LoginAttempt.findOneAndUpdate(
    { identifier },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
  if (rec.count >= MAX_ATTEMPTS) {
    rec.lockUntil = new Date(Date.now() + LOCK_MINUTES * 60000);
    rec.count = 0;
    await rec.save();
  }
}

async function clearAttempts(identifier) {
  await LoginAttempt.deleteOne({ identifier });
}

module.exports = { assertNotLocked, recordFailure, clearAttempts };
