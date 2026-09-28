const { cloudinary, isCloudinaryConfigured } = require("../config/cloudinary");

/**
 * Upload a file buffer. Uses Cloudinary when configured, otherwise falls back
 * to an inline data-URI so the flow works end-to-end without credentials.
 */
async function uploadBuffer(buffer, { folder = "cet/uploads", mimetype = "image/jpeg" } = {}) {
  if (!isCloudinaryConfigured) {
    const base64 = buffer.toString("base64");
    return { url: `data:${mimetype};base64,${base64}`, publicId: null };
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => {
        if (err) return reject(err);
        return resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

async function destroy(publicId) {
  if (!isCloudinaryConfigured || !publicId) return { result: "skipped" };
  return cloudinary.uploader.destroy(publicId, { invalidate: true });
}

module.exports = { uploadBuffer, destroy };
