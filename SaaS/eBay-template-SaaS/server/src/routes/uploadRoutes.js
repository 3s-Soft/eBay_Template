const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { authMiddleware } = require("../middleware/auth");
const { uploadImages } = require("../controllers/uploadController");

const uploadDirectory = path.resolve(__dirname, "..", "..", "uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension).replace(/\s+/g, "-");
    callback(null, `${Date.now()}-${basename}${extension}`);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true);
    return;
  }

  callback(new Error("Only image files are allowed"));
};

const upload = multer({ storage, fileFilter, limits: { files: 10, fileSize: 5 * 1024 * 1024 } });
const router = express.Router();

router.use(authMiddleware);
router.post("/images", upload.array("images", 10), uploadImages);

module.exports = router;
