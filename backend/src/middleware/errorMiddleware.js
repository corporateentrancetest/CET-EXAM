const { error } = require("../utils/response");

/** 404 handler for unmatched routes. */
function notFound(req, res) {
  return error(res, { statusCode: 404, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

/** Centralised error handler. Maps duplicate-key + known errors to clean responses. */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error("[error]", err.message);

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return error(res, { statusCode: 409, message: `An account with this ${field} already exists.` });
  }

  const statusCode = err.statusCode || 500;
  return error(res, {
    statusCode,
    message: err.message || "Internal server error",
  });
}

module.exports = { notFound, errorHandler };
