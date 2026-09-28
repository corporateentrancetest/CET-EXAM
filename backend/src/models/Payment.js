const mongoose = require("mongoose");
const { PAYMENT_STATUS } = require("../constants");

const paymentSchema = new mongoose.Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
    application: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
    orderId: { type: String, required: true },
    paymentId: String,
    signature: String,
    amount: { type: Number, required: true }, // in INR (rupees)
    currency: { type: String, default: "INR" },
    method: String, // upi / card / netbanking (mock)
    status: { type: String, enum: Object.values(PAYMENT_STATUS), default: PAYMENT_STATUS.CREATED },
    paidAt: Date,
  },
  { timestamps: true, collection: "payments" }
);

module.exports = mongoose.model("Payment", paymentSchema);
