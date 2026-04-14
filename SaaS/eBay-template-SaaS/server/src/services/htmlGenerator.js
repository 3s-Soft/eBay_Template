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
        (imageUrl, index) => `
      <div style="width:${index === 0 && normalized.length > 2 ? "100%" : "calc(50% - 5px)"};min-width:190px;box-sizing:border-box;">
        <img
          src="${imageUrl}"
          alt="Product Image"
          style="width:100%;height:${index === 0 && normalized.length > 2 ? "300px" : "190px"};object-fit:cover;border:1px solid #d1d5db;border-radius:8px;display:block;"
        />
      </div>
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
