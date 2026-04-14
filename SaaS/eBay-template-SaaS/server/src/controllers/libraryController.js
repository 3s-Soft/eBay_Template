const { Template } = require("../models/Template");
const { asyncHandler } = require("../utils/asyncHandler");

const getLibraryTemplates = asyncHandler(async (req, res) => {
  const templates = await Template.find({ isPrebuilt: true }).sort({ name: 1 });
  return res.json({ templates });
});

module.exports = { getLibraryTemplates };
