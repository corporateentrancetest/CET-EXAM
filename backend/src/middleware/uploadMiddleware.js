const multer = require("multer");

// In-memory storage — buffers are streamed to Cloudinary by uploadService.
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    return cb(new Error("Only JPG, PNG or PDF files are allowed"));
  },
});

// Named document fields uploaded in the post-payment step.
const applicationDocuments = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "signature", maxCount: 1 },
  { name: "idProof", maxCount: 1 },
  { name: "collegeId", maxCount: 1 },
]);

module.exports = { upload, applicationDocuments };
