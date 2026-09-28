const cloudinary = require("cloudinary").v2;
const env = require("./env");

const isConfigured = Boolean(
  env.cloudinary.cloudName && env.cloudinary.apiKey && env.cloudinary.apiSecret
);

if (isConfigured) {
  cloudinary.config({
    cloud_name: env.cloudinary.cloudName,
    api_key: env.cloudinary.apiKey,
    api_secret: env.cloudinary.apiSecret,
    secure: true,
  });
  console.log("[cloudinary] configured");
} else {
  console.log("[cloudinary] credentials missing — uploads use local data-URI fallback");
}

module.exports = { cloudinary, isCloudinaryConfigured: isConfigured };
