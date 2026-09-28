/**
 * Centralised environment configuration.
 * All secrets/config are read from process.env only — never hardcoded.
 */
require("dotenv").config();

const env = {
  nodePort: parseInt(process.env.NODE_PORT || "9000", 10),
  mongoUrl: process.env.MONGO_URL,
  dbName: process.env.DB_NAME,
  corsOrigins: process.env.CORS_ORIGINS || "*",

  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",

  admin: {
    email: (process.env.ADMIN_EMAIL || "").toLowerCase(),
    password: process.env.ADMIN_PASSWORD,
    name: process.env.ADMIN_NAME || "CET Administrator",
  },

  examFeeInr: parseInt(process.env.EXAM_FEE_INR || "250", 10),
  applicationCloseDate: process.env.APPLICATION_CLOSE_DATE || "2026-12-31T23:59:59+05:30",
  supportEmail: process.env.SUPPORT_EMAIL || "help@corporateentrancetest.com",

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
};

module.exports = env;
