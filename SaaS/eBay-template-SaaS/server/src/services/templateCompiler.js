const { sanitizeEbayHtml } = require("../utils/sanitize");

const defaultStyle = {
  textColor: "#111827",
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  padding: "16px",
  margin: "0 0 14px 0",
  borderRadius: "10px",
  border: "1px solid #dbe3ef",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.08)"
};

const styleToInline = (style = {}) => {
  const normalized = {
    ...defaultStyle,
    ...style
  };

  const map = {
    color: normalized.textColor,
    "background-color": normalized.backgroundColor,
    "font-family": normalized.fontFamily,
    "font-size": normalized.fontSize,
    padding: normalized.padding,
    margin: normalized.margin,
    "border-radius": normalized.borderRadius,
    border: normalized.border,
    "box-shadow": normalized.boxShadow
  };

  return Object.entries(map)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
};

const renderTitleBlock = (block) => {
  const title = block.content?.text || "{{title}}";
  const subtitle =
    block.content?.subtitle || "Condition: {{condition}} | Price: ${{price}}";
  const style = styleToInline({
    textColor: "#f5ede3",
    backgroundColor: "#1c1016",
    border: "1px solid rgba(212, 168, 83, 0.14)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    ...block.style
  });

  return `
    <section style="${style}">
      <div style="border-top:2px solid;border-image:linear-gradient(90deg,#dc2626,#d4a853,#dc2626) 1;padding-top:16px;padding-bottom:16px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div style="width:24px;height:1px;background:#d4a853;"></div>
          <p style="margin:0;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#d4a853;font-weight:700;">Premium Listing</p>
        </div>
        <h1 style="margin:0 0 12px 0;font-size:28px;line-height:1.2;font-weight:700;color:#f5ede3;font-family:'Georgia, serif';">${title}</h1>
        <p style="margin:0;font-size:13px;color:#d4a853;font-weight:600;letter-spacing:1px;">${subtitle}</p>
      </div>
      <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">
        <span style="display:inline-block;background:rgba(212,168,83,0.08);border:1px solid rgba(212,168,83,0.3);color:#f0c878;padding:5px 12px;border-radius:2px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">✓ Authentic</span>
        <span style="display:inline-block;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.3);color:#ef4444;padding:5px 12px;border-radius:2px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Fast Ship</span>
        <span style="display:inline-block;background:rgba(245,237,227,0.06);border:1px solid rgba(245,237,227,0.2);color:#f5ede3;padding:5px 12px;border-radius:2px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Buyer Safe</span>
      </div>
    </section>
  `;
};

const renderImageGalleryBlock = (block) => {
  const heading = block.content?.heading || "Product Gallery";
  const style = styleToInline(block.style);

  return `
    <section style="${style}">
      <div style="display:flex;align-items:center;gap:10px;margin:0 0 16px 0;padding-bottom:12px;border-bottom:1px solid rgba(212,168,83,0.14);">
        <div style="width:20px;height:1px;background:#d4a853;"></div>
        <h2 style="margin:0;font-size:10px;font-weight:700;text-transform:uppercase;color:#d4a853;letter-spacing:2px;">${heading}</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
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
      <div style="display:flex;align-items:center;gap:10px;margin:0 0 14px 0;padding-bottom:12px;border-bottom:1px solid rgba(212,168,83,0.14);">
        <div style="width:20px;height:1px;background:#d4a853;"></div>
        <h2 style="margin:0;font-size:10px;font-weight:700;text-transform:uppercase;color:#d4a853;letter-spacing:2px;">${title}</h2>
      </div>
      <div style="white-space:pre-line;line-height:1.7;color:#8b7068;font-size:13px;font-family:'Inter, sans-serif';">
        ${body}
      </div>
    </section>
  `;
};

const renderSpecsTableBlock = (block) => {
  const rows = Array.isArray(block.content?.rows) ? block.content.rows : [];
  const style = styleToInline(block.style);
  const rowHtml = rows
    .map(
      (row, idx) => `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(212,168,83,0.14);">
        <div style="background:#1c1016;padding:12px 14px;">
          <div style="font-size:8px;font-weight:700;text-transform:uppercase;color:#d4a853;letter-spacing:2px;margin-bottom:4px;">${row.key || ""}</div>
          <div style="font-size:13px;color:#f5ede3;font-weight:600;">${row.value || ""}</div>
        </div>
      </div>
    `
    )
    .join("");

  return `
    <section style="${style}">
      <div style="display:flex;align-items:center;gap:10px;margin:0 0 14px 0;padding-bottom:12px;border-bottom:1px solid rgba(212,168,83,0.14);">
        <div style="width:20px;height:1px;background:#d4a853;"></div>
        <h2 style="margin:0;font-size:10px;font-weight:700;text-transform:uppercase;color:#d4a853;letter-spacing:2px;">Specifications</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:rgba(212,168,83,0.14);">
        ${rows.map(row => `
        <div style="background:#1c1016;padding:12px 14px;display:flex;flex-direction:column;gap:4px;">
          <div style="font-size:8px;font-weight:700;text-transform:uppercase;color:#d4a853;letter-spacing:2px;">${row.key || ""}</div>
          <div style="font-size:13px;color:#f5ede3;font-weight:600;">${row.value || ""}</div>
        </div>
        `).join("")}
      </div>
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
      <div style="display:flex;align-items:center;gap:10px;margin:0 0 14px 0;padding-bottom:12px;border-bottom:1px solid rgba(212,168,83,0.14);">
        <div style="width:20px;height:1px;background:#d4a853;"></div>
        <h2 style="margin:0;font-size:10px;font-weight:700;text-transform:uppercase;color:#d4a853;letter-spacing:2px;">Shipping & Returns</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
        <div style="background:#1c1016;border:1px solid rgba(212,168,83,0.14);border-radius:2px;padding:14px;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
            <span style="font-size:16px;">📦</span>
            <p style="margin:0;font-size:9px;font-weight:700;text-transform:uppercase;color:#d4a853;letter-spacing:2px;">Shipping</p>
          </div>
          <p style="margin:0;font-size:12px;line-height:1.6;color:#e8ddd5;">${shipping}</p>
        </div>
        <div style="background:#1c1016;border:1px solid rgba(212,168,83,0.14);border-radius:2px;padding:14px;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
            <span style="font-size:16px;">🔄</span>
            <p style="margin:0;font-size:9px;font-weight:700;text-transform:uppercase;color:#d4a853;letter-spacing:2px;">Returns</p>
          </div>
          <p style="margin:0;font-size:12px;line-height:1.6;color:#e8ddd5;">${returns}</p>
        </div>
      </div>
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
    "padding:18px",
    `font-family:${globalStyles.fontFamily || "'Inter', sans-serif"}`,
    `color:${globalStyles.textColor || "#e8ddd5"}`,
    `background-color:${globalStyles.backgroundColor || "#0a0608"}`,
    "line-height:1.6",
    "box-sizing:border-box"
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
