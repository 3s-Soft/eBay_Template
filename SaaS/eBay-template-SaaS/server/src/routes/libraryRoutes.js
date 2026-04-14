const express = require("express");
const { getLibraryTemplates } = require("../controllers/libraryController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);
router.get("/templates", getLibraryTemplates);

module.exports = router;
