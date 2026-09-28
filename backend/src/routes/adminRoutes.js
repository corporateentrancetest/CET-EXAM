const express = require("express");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// All admin routes require a valid admin session.
router.use(authMiddleware, adminMiddleware);

router.get("/stats", adminController.stats);
router.get("/applications", adminController.listApplications);
router.get("/applications/:id", adminController.getApplication);
router.patch("/applications/:id/status", adminController.updateStatus);
router.get("/payments", adminController.listPayments);

module.exports = router;
