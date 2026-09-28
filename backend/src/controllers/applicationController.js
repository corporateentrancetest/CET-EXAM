const { validationResult } = require("express-validator");
const Application = require("../models/Application");
const uploadService = require("../services/uploadService");
const { success, error } = require("../utils/response");
const { APPLICATION_STATUS } = require("../constants");

/** GET /api/applications/me — fetch the current candidate's application. */
async function getMine(req, res, next) {
  try {
    const application = await Application.findOne({ candidate: req.user._id });
    if (!application) return error(res, { statusCode: 404, message: "No application found" });
    return success(res, { data: application });
  } catch (err) {
    return next(err);
  }
}

/**
 * PATCH /api/applications/me — autosave a partial draft.
 * Any subset of sections may be sent; incomplete data is persisted so nothing
 * is lost if the candidate leaves mid-form.
 */
async function updateMine(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return error(res, { statusCode: 422, message: result.array()[0].msg });
  }
  try {
    const application = await Application.findOne({ candidate: req.user._id });
    if (!application) return error(res, { statusCode: 404, message: "No application found" });

    const sections = ["personal", "academic", "address", "preferences", "declarations"];
    sections.forEach((section) => {
      if (req.body[section] && typeof req.body[section] === "object") {
        application[section] = { ...(application[section] || {}), ...req.body[section] };
      }
    });
    if (typeof req.body.currentStep === "number") application.currentStep = req.body.currentStep;

    await application.save();
    return success(res, { message: "Draft saved", data: application });
  } catch (err) {
    return next(err);
  }
}

/**
 * POST /api/applications/me/documents — upload photo/signature/ID/college-ID.
 * Allowed only AFTER payment is complete (per the required form order).
 */
async function uploadDocuments(req, res, next) {
  try {
    const application = await Application.findOne({ candidate: req.user._id });
    if (!application) return error(res, { statusCode: 404, message: "No application found" });

    if (application.payment.status !== "paid") {
      return error(res, {
        statusCode: 403,
        message: "Please complete the ₹fee payment before uploading documents.",
      });
    }

    const files = req.files || {};
    const fields = ["photo", "signature", "idProof", "collegeId"];
    // eslint-disable-next-line no-restricted-syntax
    for (const field of fields) {
      if (files[field] && files[field][0]) {
        const file = files[field][0];
        // eslint-disable-next-line no-await-in-loop
        const uploaded = await uploadService.uploadBuffer(file.buffer, {
          folder: `cet/${req.user._id}/${field}`,
          mimetype: file.mimetype,
        });
        application.documents[field] = { ...uploaded, uploadedAt: new Date() };
      }
    }

    await application.save();
    return success(res, { message: "Documents uploaded", data: application });
  } catch (err) {
    return next(err);
  }
}

/** POST /api/applications/me/submit — final submission. */
async function submitMine(req, res, next) {
  try {
    const application = await Application.findOne({ candidate: req.user._id });
    if (!application) return error(res, { statusCode: 404, message: "No application found" });

    if (application.payment.status !== "paid") {
      return error(res, { statusCode: 403, message: "Payment is required before submission." });
    }
    if (!application.documents.photo || !application.documents.signature) {
      return error(res, { statusCode: 400, message: "Photo and signature are required." });
    }
    if (!application.declarations.termsAccepted || !application.declarations.infoAccurate) {
      return error(res, { statusCode: 400, message: "Please accept the declarations to submit." });
    }

    application.status = APPLICATION_STATUS.SUBMITTED;
    application.submittedAt = new Date();
    application.currentStep = 9;
    await application.save();

    return success(res, { message: "Application submitted successfully", data: application });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getMine, updateMine, uploadDocuments, submitMine };
