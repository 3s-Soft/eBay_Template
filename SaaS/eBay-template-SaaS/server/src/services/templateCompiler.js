const { sanitizeEbayHtml } = require("../utils/sanitize");

const styleToInline = (style = {}) => {
  const map = {
    color: style.textColor,
    "background-color": style.backgroundColor,
    "font-family": style.fontFamily,
    "font-size": style.fontSize,
    padding: style.padding,
    margin: style.margin,
    "border-radius": style.borderRadius,
    border: style.border
  };

  return Object.entries(map)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
};

const renderTitleBlock = (block) => {
  const title = block.content?.text || "{{title}}";
  const subtitle = block.content?.subtitle || "Price: ${{price}}";
  const style = styleToInline(block.style);

  return `
    <section style="${style}">
      <h1 style="margin:0 0 8px 0;font-size:26px;line-height:1.2;">${title}</h1>
      <p style="margin:0;color:#475569;">${subtitle}</p>
    </section>
  `;
};

const renderImageGalleryBlock = (block) => {
  const heading = block.content?.heading || "Images";
  const style = styleToInline(block.style);

  return `
    <section style="${style}">
      <h2 style="margin:0 0 10px 0;font-size:18px;">${heading}</h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        {{{renderImages images}}}
      </div>
    </section>
  `;
};

const renderDescriptionBlock = (block) => {
  const title = block.content?.title || "Description";
  const body = block.content?.body || "{{description}}";
  const style = styleToInline(block.style);

  return `
    <section style="${style}">
      <h2 style="margin:0 0 8px 0;font-size:18px;">${title}</h2>
      <div style="white-space:pre-line;line-height:1.5;">${body}</div>
    </section>
  `;
};

const renderSpecsTableBlock = (block) => {
  const rows = Array.isArray(block.content?.rows) ? block.content.rows : [];
  const style = styleToInline(block.style);
  const rowHtml = rows
    .map(
      (row) => `
      <tr>
        <td style="padding:8px;border:1px solid #d1d5db;background:#f8fafc;font-weight:600;">${
          row.key || ""
        }</td>
        <td style="padding:8px;border:1px solid #d1d5db;">${row.value || ""}</td>
      </tr>
    `
    )
    .join("");

  return `
    <section style="${style}">
      <h2 style="margin:0 0 8px 0;font-size:18px;">Product Specs</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tbody>
          ${rowHtml}
        </tbody>
      </table>
    </section>
  `;
};

const renderShippingReturnsBlock = (block) => {
  const shipping =
    block.content?.shipping || "Fast dispatch with tracking included.";
  const returns =
    block.content?.returns || "Returns accepted based on listing policy.";
  const style = styleToInline(block.style);

  return `
    <section style="${style}">
      <h2 style="margin:0 0 8px 0;font-size:18px;">Shipping & Returns</h2>
      <p style="margin:0 0 6px 0;"><strong>Shipping:</strong> ${shipping}</p>
      <p style="margin:0;"><strong>Returns:</strong> ${returns}</p>
    </section>
  `;
};

const BLOCK_RENDERERS = {
  title: renderTitleBlock,
  imageGallery: renderImageGalleryBlock,
  description: renderDescriptionBlock,
  specsTable: renderSpecsTableBlock,
  shippingReturns: renderShippingReturnsBlock
};

const buildTemplateHtmlFromBlocks = ({ blocks = [], globalStyles = {} }) => {
  const sectionHtml = blocks
    .map((block) => {
      const renderer = BLOCK_RENDERERS[block.type];
      if (!renderer) {
        return "";
      }

      return renderer(block);
    })
    .join("");

  const containerStyle = [
    `max-width:${globalStyles.maxWidth || "860px"}`,
    "margin:0 auto",
    `font-family:${globalStyles.fontFamily || "Arial, sans-serif"}`,
    `color:${globalStyles.textColor || "#111827"}`,
    `background-color:${globalStyles.backgroundColor || "#ffffff"}`,
    "line-height:1.5"
  ].join(";");

  return sanitizeEbayHtml(`
    <div style="${containerStyle}">
      ${sectionHtml}
    </div>
  `);
};

module.exports = {
  buildTemplateHtmlFromBlocks
};
