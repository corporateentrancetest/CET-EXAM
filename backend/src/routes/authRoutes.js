const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { registerValidator, loginValidator, adminLoginValidator } = require("../validators/authValidator");

const router = express.Router();

router.post("/register", registerValidator, authController.register);
router.post("/login", loginValidator, authController.login);
router.post("/admin/login", adminLoginValidator, authController.adminLogin);
router.get("/me", authMiddleware, authController.me);

module.exports = router;
