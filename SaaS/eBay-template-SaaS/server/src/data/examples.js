const exampleTemplateJson = {
  name: "Sneakers Conversion Pro",
  category: "Sneakers",
  globalStyles: {
    fontFamily: "Arial, sans-serif",
    textColor: "#111827",
    backgroundColor: "#ffffff",
    maxWidth: "900px"
  },
  blocks: [
    {
      id: "title-1",
      type: "title",
      content: {
        text: "{{title}}",
        subtitle: "Condition: {{condition}} | Price: ${{price}}"
      }
    },
    {
      id: "gallery-1",
      type: "imageGallery",
      content: { heading: "Product Images" }
    },
    {
      id: "desc-1",
      type: "description",
      content: {
        title: "Description",
        body: "{{description}}"
      }
    }
  ]
};

const exampleGeneratedHtml = `
<div style="max-width:900px;margin:0 auto;font-family:Arial, sans-serif;color:#111827;background-color:#ffffff;line-height:1.5">
  <section style="padding:12px;border:1px solid #e5e7eb">
    <h1 style="margin:0 0 8px 0;font-size:26px;line-height:1.2;">Nike Air Max 90 Infrared</h1>
    <p style="margin:0;color:#475569;">Condition: Pre-owned | Price: $129.99</p>
  </section>
  <section style="padding:12px;border:1px solid #e5e7eb">
    <h2 style="margin:0 0 10px 0;font-size:18px;">Product Images</h2>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <img src="https://cdn.example.com/shoe-1.jpg" alt="Product Image" style="width:120px;height:120px;object-fit:cover;border:1px solid #d1d5db;border-radius:6px;" />
      <img src="https://cdn.example.com/shoe-2.jpg" alt="Product Image" style="width:120px;height:120px;object-fit:cover;border:1px solid #d1d5db;border-radius:6px;" />
    </div>
  </section>
</div>
`.trim();

module.exports = {
  exampleTemplateJson,
  exampleGeneratedHtml
};
