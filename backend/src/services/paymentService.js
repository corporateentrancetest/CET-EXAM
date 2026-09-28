const crypto = require("crypto");
const env = require("../config/env");
const { PAYMENT_STATUS } = require("../constants");

/**
 * Payment service — placeholder-ready Razorpay/UPI integration.
 * Order creation and verification are mocked deterministically so the ₹fee flow
 * works end-to-end in v1. Replace the bodies with real Razorpay SDK calls when
 * live keys are available; controllers/routes remain unchanged.
 */

function createOrder({ amount }) {
  const orderId = `order_${crypto.randomBytes(8).toString("hex")}`;
  return {
    orderId,
    amount, // INR
    amountPaise: amount * 100,
    currency: "INR",
    gateway: "razorpay-mock",
    status: PAYMENT_STATUS.CREATED,
  };
}

// Mock verification: any non-empty paymentId is accepted. A real integration
// would validate the HMAC signature against orderId|paymentId here.
function verifyPayment({ orderId, paymentId }) {
  return Boolean(orderId && paymentId);
}

module.exports = { createOrder, verifyPayment, feeAmount: env.examFeeInr };
