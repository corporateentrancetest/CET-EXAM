const { ROLES } = require("../constants");
const { error } = require("../utils/response");

/** Must run after authMiddleware. Restricts a route to admin accounts. */
function adminMiddleware(req, res, next) {
  if (req.role !== ROLES.ADMIN) {
    return error(res, { statusCode: 403, message: "Admin access required" });
  }
  return next();
}

module.exports = adminMiddleware;
