const { asyncHandler } = require("../utils/asyncHandler");
const { generateAiDescription } = require("../services/aiDescriptionGenerator");

const generateDescription = asyncHandler(async (req, res) => {
  const description = generateAiDescription(req.body || {});
  return res.json({ description });
});

module.exports = { generateDescription };
