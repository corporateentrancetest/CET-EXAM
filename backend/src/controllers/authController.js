const { validationResult } = require("express-validator");
const authService = require("../services/authService");
const { success, error } = require("../utils/response");

function collectErrors(req, res) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    error(res, {
      statusCode: 422,
      message: result.array()[0].msg,
      errors: result.array().map((e) => ({ field: e.path, message: e.msg })),
    });
    return true;
  }
  return false;
}

async function register(req, res, next) {
  if (collectErrors(req, res)) return undefined;
  try {
    const data = await authService.registerCandidate(req.body);
    return success(res, { statusCode: 201, message: "Account created — application started", data });
  } catch (err) {
    if (err.statusCode) return error(res, { statusCode: err.statusCode, message: err.message });
    return next(err);
  }
}

async function login(req, res, next) {
  if (collectErrors(req, res)) return undefined;
  try {
    const data = await authService.loginCandidate(req.body);
    return success(res, { message: "Login successful", data });
  } catch (err) {
    if (err.statusCode) return error(res, { statusCode: err.statusCode, message: err.message });
    return next(err);
  }
}

async function adminLogin(req, res, next) {
  if (collectErrors(req, res)) return undefined;
  try {
    const data = await authService.loginAdmin(req.body);
    return success(res, { message: "Admin login successful", data });
  } catch (err) {
    if (err.statusCode) return error(res, { statusCode: err.statusCode, message: err.message });
    return next(err);
  }
}

async function me(req, res) {
  const data = req.user.toSafeJSON();
  return success(res, { message: "OK", data: { ...data, role: req.role } });
}

module.exports = { register, login, adminLogin, me };
