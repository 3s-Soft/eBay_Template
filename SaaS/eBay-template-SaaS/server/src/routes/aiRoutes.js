const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const { generateDescription } = require("../controllers/aiController");

const router = express.Router();

router.use(authMiddleware);
router.post("/description", generateDescription);

module.exports = router;
