const express = require("express");
const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");
const { verifyPaymentValidator } = require("../validators/paymentValidator");

const router = express.Router();

router.get("/config", paymentController.config);
router.post("/create-order", authMiddleware, paymentController.createOrder);
router.post("/verify", authMiddleware, verifyPaymentValidator, paymentController.verify);

module.exports = router;
