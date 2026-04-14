const Handlebars = require("handlebars");
const { buildTemplateHtmlFromBlocks } = require("./templateCompiler");
const { sanitizeEbayHtml } = require("../utils/sanitize");

const normalizeImages = (images) => {
  if (Array.isArray(images)) {
    return images.filter(Boolean);
  }

  if (typeof images === "string") {
    if (!images.trim()) {
      return [];
    }

    return images
      .split(/[|,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const createHandlebarsRuntime = () => {
  const runtime = Handlebars.create();

  runtime.registerHelper("renderImages", (images) => {
    const normalized = normalizeImages(images);
    if (!normalized.length) {
      return "";
    }

    const markup = normalized
      .map(
        (imageUrl) => `
      <img
        src="${imageUrl}"
        alt="Product Image"
        style="width:120px;height:120px;object-fit:cover;border:1px solid #d1d5db;border-radius:6px;"
      />
    `
      )
      .join("");

    return new runtime.SafeString(markup);
  });

  return runtime;
};

const generateListingHtml = (template, productData = {}) => {
  const runtime = createHandlebarsRuntime();
  const source =
    template.handlebarsTemplate ||
    buildTemplateHtmlFromBlocks({
      blocks: template.blocks,
      globalStyles: template.globalStyles
    });

  const mergedData = {
    title: "",
    price: "",
    description: "",
    condition: "",
    images: [],
    ...productData,
    images: normalizeImages(productData.images)
  };

  const compiled = runtime.compile(source, { strict: false });
  const html = sanitizeEbayHtml(compiled(mergedData));

  return { html, templateSource: source };
};

module.exports = { generateListingHtml };
