const { body } = require("express-validator");

const verifyPaymentValidator = [
  body("orderId").trim().notEmpty().withMessage("orderId is required"),
  body("paymentId").trim().notEmpty().withMessage("paymentId is required"),
  body("method").optional().isString(),
];

module.exports = { verifyPaymentValidator };
