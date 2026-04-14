const { parse } = require("csv-parse/sync");
const { Template } = require("../models/Template");
const { asyncHandler } = require("../utils/asyncHandler");
const { generateListingHtml } = require("../services/htmlGenerator");

const mapRowToData = (row, mapping) => {
  return Object.entries(mapping).reduce((acc, [variable, csvField]) => {
    acc[variable] = row[csvField] ?? "";
    return acc;
  }, {});
};

const bulkGenerate = asyncHandler(async (req, res) => {
  const { templateId, mapping } = req.body;
  const file = req.file;

  if (!templateId) {
    return res.status(400).json({ message: "templateId is required" });
  }

  if (!mapping) {
    return res.status(400).json({ message: "mapping is required" });
  }

  if (!file) {
    return res.status(400).json({ message: "CSV file is required" });
  }

  let parsedMapping;
  try {
    parsedMapping = JSON.parse(mapping);
  } catch {
    return res.status(400).json({ message: "mapping must be valid JSON" });
  }

  const template = await Template.findById(templateId);
  if (!template) {
    return res.status(404).json({ message: "Template not found" });
  }

  if (!template.isPrebuilt && template.user?.toString() !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const rows = parse(file.buffer, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  const generated = rows.map((row, idx) => {
    const data = mapRowToData(row, parsedMapping);
    const { html } = generateListingHtml(template, data);

    return {
      row: idx + 1,
      data,
      html
    };
  });

  return res.json({
    count: generated.length,
    generated
  });
});

module.exports = { bulkGenerate };
