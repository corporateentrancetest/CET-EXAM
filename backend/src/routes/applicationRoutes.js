const express = require("express");
const applicationController = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");
const { applicationDocuments } = require("../middleware/uploadMiddleware");
const { updateApplicationValidator } = require("../validators/applicationValidator");

const router = express.Router();

router.get("/me", authMiddleware, applicationController.getMine);
router.patch("/me", authMiddleware, updateApplicationValidator, applicationController.updateMine);
router.post("/me/documents", authMiddleware, applicationDocuments, applicationController.uploadDocuments);
router.post("/me/submit", authMiddleware, applicationController.submitMine);

module.exports = router;
