const { Template } = require("../models/Template");
const { asyncHandler } = require("../utils/asyncHandler");
const { generateListingHtml } = require("../services/htmlGenerator");
const { buildTemplateHtmlFromBlocks } = require("../services/templateCompiler");

const ensureTemplateAccess = (template, userId) => {
  if (!template) {
    return { ok: false, status: 404, message: "Template not found" };
  }

  if (template.isPrebuilt) {
    return { ok: true };
  }

  if (!template.user || template.user.toString() !== userId) {
    return { ok: false, status: 403, message: "Forbidden" };
  }

  return { ok: true };
};

const listTemplates = asyncHandler(async (req, res) => {
  const ownTemplates = await Template.find({
    $or: [{ user: req.user.id }, { isPrebuilt: true }]
  }).sort({ updatedAt: -1 });

  return res.json({ templates: ownTemplates });
});

const getTemplateById = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  const access = ensureTemplateAccess(template, req.user.id);

  if (!access.ok) {
    return res.status(access.status).json({ message: access.message });
  }

  return res.json({ template });
});

const createTemplate = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    description,
    blocks = [],
    globalStyles = {},
    handlebarsTemplate
  } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Template name is required" });
  }

  const template = await Template.create({
    user: req.user.id,
    name,
    category,
    description,
    blocks,
    globalStyles,
    handlebarsTemplate:
      handlebarsTemplate ||
      buildTemplateHtmlFromBlocks({
        blocks,
        globalStyles
      })
  });

  return res.status(201).json({ template });
});

const updateTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  const access = ensureTemplateAccess(template, req.user.id);

  if (!access.ok) {
    return res.status(access.status).json({ message: access.message });
  }

  if (template.isPrebuilt) {
    return res.status(400).json({
      message: "Prebuilt templates are read-only. Duplicate to customize."
    });
  }

  const { name, category, description, blocks, globalStyles, handlebarsTemplate } =
    req.body;

  if (name !== undefined) template.name = name;
  if (category !== undefined) template.category = category;
  if (description !== undefined) template.description = description;
  if (blocks !== undefined) template.blocks = blocks;
  if (globalStyles !== undefined) template.globalStyles = globalStyles;

  if (handlebarsTemplate !== undefined) {
    template.handlebarsTemplate = handlebarsTemplate;
  } else if (blocks !== undefined || globalStyles !== undefined) {
    template.handlebarsTemplate = buildTemplateHtmlFromBlocks({
      blocks: template.blocks,
      globalStyles: template.globalStyles
    });
  }

  await template.save();

  return res.json({ template });
});

const deleteTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  const access = ensureTemplateAccess(template, req.user.id);

  if (!access.ok) {
    return res.status(access.status).json({ message: access.message });
  }

  if (template.isPrebuilt) {
    return res.status(400).json({
      message: "Prebuilt templates cannot be deleted"
    });
  }

  await template.deleteOne();
  return res.status(204).send();
});

const generateTemplateHtml = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  const access = ensureTemplateAccess(template, req.user.id);

  if (!access.ok) {
    return res.status(access.status).json({ message: access.message });
  }

  const { data = {} } = req.body;
  const result = generateListingHtml(template, data);

  return res.json({
    templateId: template._id,
    html: result.html
  });
});

const previewTemplateHtml = asyncHandler(async (req, res) => {
  const { blocks = [], globalStyles = {}, data = {} } = req.body;
  const template = {
    blocks,
    globalStyles,
    handlebarsTemplate: ""
  };

  const result = generateListingHtml(template, data);
  return res.json({ html: result.html });
});

const duplicateTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  const access = ensureTemplateAccess(template, req.user.id);

  if (!access.ok) {
    return res.status(access.status).json({ message: access.message });
  }

  const duplicate = await Template.create({
    user: req.user.id,
    name: `${template.name} (Copy)`,
    category: template.category,
    description: template.description,
    blocks: template.blocks,
    globalStyles: template.globalStyles,
    handlebarsTemplate: template.handlebarsTemplate
  });

  return res.status(201).json({ template: duplicate });
});

module.exports = {
  listTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  generateTemplateHtml,
  previewTemplateHtml,
  duplicateTemplate
};
