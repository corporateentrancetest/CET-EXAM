const jwt = require("jsonwebtoken");
const env = require("../config/env");

/** Sign a JWT for a user (candidate or admin). */
function generateToken(payload) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

/** Verify and decode a JWT. Throws on invalid/expired tokens. */
function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

module.exports = { generateToken, verifyToken };
