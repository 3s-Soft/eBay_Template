const express = require("express");
const multer = require("multer");
const { bulkGenerate } = require("../controllers/bulkController");
const { authMiddleware } = require("../middleware/auth");

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.use(authMiddleware);
router.post("/generate", upload.single("csv"), bulkGenerate);

module.exports = router;
