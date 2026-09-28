const Application = require("../models/Application");
const { success } = require("../utils/response");

/** GET /api/candidates/me — profile of the logged-in candidate + their application. */
async function getProfile(req, res, next) {
  try {
    const application = await Application.findOne({ candidate: req.user._id });
    return success(res, {
      message: "OK",
      data: { candidate: req.user.toSafeJSON(), application },
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getProfile };
