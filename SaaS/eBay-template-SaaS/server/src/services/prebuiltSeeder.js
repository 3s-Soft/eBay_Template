const { Template } = require("../models/Template");
const { prebuiltTemplates } = require("../data/prebuiltTemplates");
const { buildTemplateHtmlFromBlocks } = require("./templateCompiler");

const seedPrebuiltTemplates = async () => {
  const writes = prebuiltTemplates.map((item) => {
    const handlebarsTemplate =
      item.handlebarsTemplate ||
      buildTemplateHtmlFromBlocks({
        blocks: item.blocks,
        globalStyles: item.globalStyles
      });

    return Template.findOneAndUpdate(
      { slug: item.slug },
      {
        $set: {
          ...item,
          handlebarsTemplate
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  });

  await Promise.all(writes);
};

module.exports = { seedPrebuiltTemplates };
