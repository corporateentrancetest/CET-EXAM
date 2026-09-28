const { body } = require("express-validator");

// Autosave is intentionally lenient — drafts can be partial. We only validate
// types/shape when fields are present so incomplete forms still persist.
const updateApplicationValidator = [
  body("personal").optional().isObject(),
  body("academic").optional().isObject(),
  body("address").optional().isObject(),
  body("preferences").optional().isObject(),
  body("declarations").optional().isObject(),
  body("currentStep").optional().isInt({ min: 1, max: 9 }),
];

module.exports = { updateApplicationValidator };
