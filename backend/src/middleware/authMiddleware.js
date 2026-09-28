const { verifyToken } = require("../utils/generateToken");
const Candidate = require("../models/Candidate");
const Admin = require("../models/Admin");
const { ROLES } = require("../constants");
const { error } = require("../utils/response");

/**
 * Authentication gate. Reads a Bearer token, verifies it, loads the matching
 * account (candidate or admin) and attaches { user, role } to the request.
 */
async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return error(res, { statusCode: 401, message: "Not authenticated" });

    const payload = verifyToken(token);
    const Model = payload.role === ROLES.ADMIN ? Admin : Candidate;
    const account = await Model.findById(payload.id);
    if (!account) return error(res, { statusCode: 401, message: "Account no longer exists" });

    req.user = account;
    req.role = payload.role;
    return next();
  } catch (err) {
    return error(res, { statusCode: 401, message: "Invalid or expired session" });
  }
}

module.exports = authMiddleware;
