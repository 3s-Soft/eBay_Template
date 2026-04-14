const express = require("express");
const {
  listTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  generateTemplateHtml,
  previewTemplateHtml,
  duplicateTemplate
} = require("../controllers/templateController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.use(authMiddleware);
router.get("/", listTemplates);
router.post("/", createTemplate);
router.post("/preview", previewTemplateHtml);
router.get("/:id", getTemplateById);
router.put("/:id", updateTemplate);
router.delete("/:id", deleteTemplate);
router.post("/:id/generate", generateTemplateHtml);
router.post("/:id/duplicate", duplicateTemplate);

module.exports = router;
