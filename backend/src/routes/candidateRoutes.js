const express = require("express");
const candidateController = require("../controllers/candidateController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, candidateController.getProfile);

module.exports = router;
