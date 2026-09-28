/** Consistent API response envelope used by every controller. */

function success(res, { statusCode = 200, message = "OK", data = null } = {}) {
  return res.status(statusCode).json({ success: true, message, data });
}

function error(res, { statusCode = 400, message = "Something went wrong", errors = null } = {}) {
  return res.status(statusCode).json({ success: false, message, errors });
}

module.exports = { success, error };
