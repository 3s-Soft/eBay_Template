import Handlebars from "handlebars";

const sanitizeEbayHtml = (html) =>
  html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\s(href|src)="javascript:[^"]*"/gi, "");

const styleToInline = (style = {}) =>
  Object.entries({
    color: style.textColor,
    "background-color": style.backgroundColor,
    "font-family": style.fontFamily,
    "font-size": style.fontSize,
    padding: style.padding,
    margin: style.margin,
    "border-radius": style.borderRadius,
    border: style.border
  })
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}:${value}`)
    .join(";");

const renderBlock = (block) => {
  const style = styleToInline(block.style);

  if (block.type === "title") {
    return `
      <section style="${style}">
        <h1 style="margin:0 0 8px 0;font-size:26px;line-height:1.2;">${block.content?.text || "{{title}}"}</h1>
        <p style="margin:0;color:#475569;">${block.content?.subtitle || "Price: ${{price}}"}</p>
      </section>
    `;
  }

  if (block.type === "imageGallery") {
    return `
      <section style="${style}">
        <h2 style="margin:0 0 10px 0;font-size:18px;">${block.content?.heading || "Images"}</h2>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          {{{renderImages images}}}
        </div>
      </section>
    `;
  }

  if (block.type === "description") {
    return `
      <section style="${style}">
        <h2 style="margin:0 0 8px 0;font-size:18px;">${block.content?.title || "Description"}</h2>
        <div style="white-space:pre-line;line-height:1.5;">${block.content?.body || "{{description}}"}</div>
      </section>
    `;
  }

  if (block.type === "specsTable") {
    const rows = Array.isArray(block.content?.rows) ? block.content.rows : [];
    const rowsMarkup = rows
      .map(
        (row) => `
        <tr>
          <td style="padding:8px;border:1px solid #d1d5db;background:#f8fafc;font-weight:600;">${row.key || ""}</td>
          <td style="padding:8px;border:1px solid #d1d5db;">${row.value || ""}</td>
        </tr>
      `
      )
      .join("");

    return `
      <section style="${style}">
        <h2 style="margin:0 0 8px 0;font-size:18px;">Product Specs</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tbody>${rowsMarkup}</tbody>
        </table>
      </section>
    `;
  }

  if (block.type === "shippingReturns") {
    return `
      <section style="${style}">
        <h2 style="margin:0 0 8px 0;font-size:18px;">Shipping & Returns</h2>
        <p style="margin:0 0 6px 0;"><strong>Shipping:</strong> ${block.content?.shipping || ""}</p>
        <p style="margin:0;"><strong>Returns:</strong> ${block.content?.returns || ""}</p>
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
          (url) =>
            `<img src="${url}" alt="Product Image" style="width:120px;height:120px;object-fit:cover;border:1px solid #d1d5db;border-radius:6px;" />`
        )
        .join("")
    );
  });

  const sectionHtml = blocks.map(renderBlock).join("");
  const containerStyle = [
    `max-width:${globalStyles.maxWidth || "900px"}`,
    "margin:0 auto",
    `font-family:${globalStyles.fontFamily || "Arial, sans-serif"}`,
    `color:${globalStyles.textColor || "#111827"}`,
    `background-color:${globalStyles.backgroundColor || "#ffffff"}`,
    "line-height:1.5"
  ].join(";");

  const template = sanitizeEbayHtml(`<div style="${containerStyle}">${sectionHtml}</div>`);
  const compile = runtime.compile(template, { strict: false });
  return sanitizeEbayHtml(compile({ ...data, images: normalizeImages(data.images) }));
};
