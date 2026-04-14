const { asyncHandler } = require("../utils/asyncHandler");

const uploadImages = asyncHandler(async (req, res) => {
  const files = req.files || [];
  if (!files.length) {
    return res.status(400).json({ message: "No image files uploaded" });
  }

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const imageUrls = files.map((file) => `${baseUrl}/uploads/${file.filename}`);

  return res.status(201).json({ imageUrls });
});

module.exports = { uploadImages };
