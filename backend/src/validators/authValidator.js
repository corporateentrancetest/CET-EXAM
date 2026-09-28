const { body } = require("express-validator");

const registerValidator = [
  body("fullName").trim().notEmpty().withMessage("Full name is required").isLength({ min: 2 }),
  body("email").trim().isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("phone")
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage("A valid 10-digit phone number is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

const loginValidator = [
  body("identifier").trim().notEmpty().withMessage("Email or phone is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const adminLoginValidator = [
  body("email").trim().isEmail().withMessage("A valid admin email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { registerValidator, loginValidator, adminLoginValidator };
