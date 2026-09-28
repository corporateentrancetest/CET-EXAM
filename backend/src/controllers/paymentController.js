const { validationResult } = require("express-validator");
const Application = require("../models/Application");
const Payment = require("../models/Payment");
const paymentService = require("../services/paymentService");
const { success, error } = require("../utils/response");
const { APPLICATION_STATUS, PAYMENT_STATUS } = require("../constants");

/** POST /api/payments/create-order — create a (mock) Razorpay order for the fee. */
async function createOrder(req, res, next) {
  try {
    const application = await Application.findOne({ candidate: req.user._id });
    if (!application) return error(res, { statusCode: 404, message: "No application found" });

    if (application.payment.status === "paid") {
      return error(res, { statusCode: 400, message: "Payment already completed." });
    }

    const order = paymentService.createOrder({ amount: paymentService.feeAmount });

    await Payment.create({
      candidate: req.user._id,
      application: application._id,
      orderId: order.orderId,
      amount: order.amount,
      currency: order.currency,
      status: PAYMENT_STATUS.CREATED,
    });

    application.payment.status = "unpaid";
    application.payment.amount = order.amount;
    application.payment.orderId = order.orderId;
    application.status = APPLICATION_STATUS.PAYMENT_PENDING;
    await application.save();

    return success(res, { message: "Order created", data: order });
  } catch (err) {
    return next(err);
  }
}

/** POST /api/payments/verify — verify (mock) and mark the application paid. */
async function verify(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) return error(res, { statusCode: 422, message: result.array()[0].msg });

  try {
    const { orderId, paymentId, method } = req.body;
    const ok = paymentService.verifyPayment({ orderId, paymentId });
    if (!ok) return error(res, { statusCode: 400, message: "Payment verification failed." });

    const payment = await Payment.findOne({ orderId, candidate: req.user._id });
    if (!payment) return error(res, { statusCode: 404, message: "Order not found." });

    payment.paymentId = paymentId;
    payment.method = method || "upi";
    payment.status = PAYMENT_STATUS.PAID;
    payment.paidAt = new Date();
    await payment.save();

    const application = await Application.findById(payment.application);
    application.payment = {
      status: "paid",
      amount: payment.amount,
      orderId,
      paymentId,
      method: payment.method,
      paidAt: payment.paidAt,
    };
    application.status = APPLICATION_STATUS.PAID;
    if (application.currentStep < 8) application.currentStep = 8;
    await application.save();

    return success(res, { message: "Payment successful", data: application });
  } catch (err) {
    return next(err);
  }
}

/** GET /api/payments/config — expose fee + gateway info for the frontend. */
async function config(req, res) {
  return success(res, {
    data: { amount: paymentService.feeAmount, currency: "INR", gateway: "razorpay-mock" },
  });
}

module.exports = { createOrder, verify, config };
