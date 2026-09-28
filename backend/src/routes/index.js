const express = require("express");
const authRoutes = require("./authRoutes");
const candidateRoutes = require("./candidateRoutes");
const applicationRoutes = require("./applicationRoutes");
const paymentRoutes = require("./paymentRoutes");
const adminRoutes = require("./adminRoutes");
const env = require("../config/env");

const router = express.Router();

// Health + public config
router.get("/", (req, res) => res.json({ success: true, message: "CET API is running" }));
router.get("/health", (req, res) => res.json({ success: true, status: "ok" }));
router.get("/public/config", (req, res) =>
  res.json({
    success: true,
    data: {
      examFee: env.examFeeInr,
      applicationCloseDate: env.applicationCloseDate,
      supportEmail: env.supportEmail,
    },
  })
);

router.use("/auth", authRoutes);
router.use("/candidates", candidateRoutes);
router.use("/applications", applicationRoutes);
router.use("/payments", paymentRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
