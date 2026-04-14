import Handlebars from "handlebars";

const sanitizeEbayHtml = (html) =>
  html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\s(href|src)="javascript:[^"]*"/gi, "");

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

  return Object.entries({
    color: normalized.textColor,
    "background-color": normalized.backgroundColor,
    "font-family": normalized.fontFamily,
    "font-size": normalized.fontSize,
    padding: normalized.padding,
    margin: normalized.margin,
    "border-radius": normalized.borderRadius,
    border: normalized.border,
    "box-shadow": normalized.boxShadow
  })
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
};

const renderBlock = (block) => {
  if (block.type === "title") {
    const headingColor = block.style?.textColor || "#f8fafc";
    const style = styleToInline({
      textColor: "#f8fafc",
      backgroundColor: "#0f172a",
      border: "1px solid rgba(245, 200, 66, 0.35)",
      boxShadow: "0 18px 38px rgba(15, 23, 42, 0.28)",
      ...block.style
    });

    return `
      <section style="${style}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;">
          <div>
            <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#f5c842;font-weight:700;">K9-Inspired Premium Listing</p>
            <h1 style="margin:0;font-size:32px;line-height:1.15;font-weight:800;color:${headingColor};text-transform:uppercase;">${block.content?.text || "{{title}}"}</h1>
          </div>
          <div style="padding:8px 12px;border-radius:999px;background:linear-gradient(135deg,#f5c842,#c9a200);color:#1f2937;font-size:12px;font-weight:800;white-space:nowrap;">
            Top Rated Seller
          </div>
        </div>
        <p style="margin:12px 0 0 0;color:${headingColor};opacity:0.9;font-size:14px;">${block.content?.subtitle || "Condition: {{condition}} | Price: ${{price}}"}</p>
        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
          <span style="display:inline-block;background:rgba(245,200,66,0.16);border:1px solid rgba(245,200,66,0.38);color:#fde68a;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;">100% Authentic</span>
          <span style="display:inline-block;background:rgba(125,211,252,0.14);border:1px solid rgba(125,211,252,0.32);color:#bae6fd;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;">Fast Dispatch</span>
          <span style="display:inline-block;background:rgba(74,222,128,0.14);border:1px solid rgba(74,222,128,0.32);color:#bbf7d0;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;">Buyer Protected</span>
        </div>
      </section>
    `;
  }

  if (block.type === "imageGallery") {
    return `
      <section style="${styleToInline(block.style)}">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin:0 0 12px 0;padding-bottom:10px;border-bottom:1px solid #e2e8f0;">
          <h2 style="margin:0;font-size:18px;font-weight:700;color:#1f2937;">${block.content?.heading || "Product Gallery"}</h2>
          <span style="font-size:12px;color:#7c3f00;font-weight:700;">Natural-light photos</span>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          {{{renderImages images}}}
        </div>
      </section>
    `;
  }

  if (block.type === "description") {
    return `
      <section style="${styleToInline(block.style)}">
        <h2 style="margin:0 0 10px 0;font-size:18px;font-weight:700;color:#1f2937;">${block.content?.title || "Description"}</h2>
        <div style="white-space:pre-line;line-height:1.7;color:#1e293b;font-size:14px;">
          ${block.content?.body || "{{description}}"}
        </div>
      </section>
    `;
  }

  if (block.type === "specsTable") {
    const rows = Array.isArray(block.content?.rows) ? block.content.rows : [];
    const rowsMarkup = rows
      .map(
        (row) => `
        <tr>
          <td style="padding:10px 12px;border:1px solid #dbe3ef;background:#f8fbff;font-weight:700;color:#0f172a;width:36%;">${row.key || ""}</td>
          <td style="padding:10px 12px;border:1px solid #dbe3ef;color:#1e293b;">${row.value || ""}</td>
        </tr>
      `
      )
      .join("");

    return `
      <section style="${styleToInline(block.style)}">
        <h2 style="margin:0 0 10px 0;font-size:18px;font-weight:700;color:#1f2937;">Product Specifications</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;border-radius:8px;overflow:hidden;">
          <tbody>${rowsMarkup}</tbody>
        </table>
      </section>
    `;
  }

  if (block.type === "shippingReturns") {
    return `
      <section style="${styleToInline(block.style)}">
        <h2 style="margin:0 0 12px 0;font-size:18px;font-weight:700;color:#1f2937;">Shipping & Returns</h2>
        <div style="font-size:0;">
          <div style="display:inline-block;vertical-align:top;width:49%;background:#f8fbff;border:1px solid #dbe3ef;border-radius:8px;padding:10px 12px;box-sizing:border-box;margin-right:2%;">
            <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#4c1d95;">Shipping</p>
            <p style="margin:0;font-size:14px;line-height:1.6;color:#1e293b;">${block.content?.shipping || ""}</p>
          </div>
          <div style="display:inline-block;vertical-align:top;width:49%;background:#f8fbff;border:1px solid #dbe3ef;border-radius:8px;padding:10px 12px;box-sizing:border-box;">
            <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#4c1d95;">Returns</p>
            <p style="margin:0;font-size:14px;line-height:1.6;color:#1e293b;">${block.content?.returns || ""}</p>
          </div>
        </div>
      </section>
    `;
  }

  return "";
};

const normalizeImages = (images) => {
  if (Array.isArray(images)) return images.filter(Boolean);
  if (typeof images !== "string" || !images.trim()) return [];
  return images
    .split(/[|,]/)
    .map((value) => value.trim())
    .filter(Boolean);
};

export const buildPreviewHtml = ({ blocks, globalStyles, data }) => {
  const runtime = Handlebars.create();
  runtime.registerHelper("renderImages", (images) => {
    const normalized = normalizeImages(images);
    if (!normalized.length) {
      return "";
    }

    return new runtime.SafeString(
      normalized
        .map(
          (url, index) => `
            <div style="width:${index === 0 && normalized.length > 2 ? "100%" : "calc(50% - 5px)"};min-width:190px;box-sizing:border-box;">
              <img src="${url}" alt="Product Image" style="width:100%;height:${index === 0 && normalized.length > 2 ? "300px" : "190px"};object-fit:cover;border:1px solid #d1d5db;border-radius:8px;display:block;" />
            </div>
          `
        )
        .join("")
    );
  });

  const sectionHtml = blocks.map(renderBlock).join("");
  const containerStyle = [
    `max-width:${globalStyles.maxWidth || "900px"}`,
    "margin:0 auto",
    "padding:18px",
    `font-family:${globalStyles.fontFamily || "Arial, sans-serif"}`,
    `color:${globalStyles.textColor || "#111827"}`,
    `background-color:${globalStyles.backgroundColor || "#f1f5f9"}`,
    "line-height:1.5",
    "box-sizing:border-box"
  ].join(";");

  const template = sanitizeEbayHtml(`<div style="${containerStyle}">${sectionHtml}</div>`);
  const compile = runtime.compile(template, { strict: false });
  return sanitizeEbayHtml(compile({ ...data, images: normalizeImages(data.images) }));
};
