const defaultBlockStyle = {
  textColor: "#111827",
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  padding: "12px",
  margin: "0 0 12px 0",
  borderRadius: "6px",
  border: "1px solid #e5e7eb"
};

const makeBlock = (id, type, content, style = {}) => ({
  id,
  type,
  content,
  style: {
    ...defaultBlockStyle,
    ...style
  }
});

const dummyUsers = [
  {
    name: "Demo Seller One",
    email: "demo1@example.com",
    password: "Password123!",
    brandSettings: {
      logoUrl: "https://picsum.photos/120/40",
      primaryColor: "#1d4ed8",
      secondaryColor: "#0f172a",
      fontFamily: "Arial, sans-serif"
    }
  },
  {
    name: "Demo Seller Two",
    email: "demo2@example.com",
    password: "Password123!",
    brandSettings: {
      logoUrl: "https://picsum.photos/121/40",
      primaryColor: "#7c3aed",
      secondaryColor: "#1f2937",
      fontFamily: "Verdana, sans-serif"
    }
  }
];

const dummyTemplates = [
  {
    ownerEmail: "demo1@example.com",
    name: "Sneaker Premium Custom",
    category: "Sneakers",
    description: "High-conversion sneaker listing layout with variable-rich content.",
    globalStyles: {
      fontFamily: "Arial, sans-serif",
      textColor: "#111827",
      backgroundColor: "#ffffff",
      maxWidth: "900px"
    },
    blocks: [
      makeBlock("title-a", "title", {
        text: "{{title}}",
        subtitle: "Condition: {{condition}} | Price: ${{price}}"
      }),
      makeBlock("gallery-a", "imageGallery", {
        heading: "Sneaker Photos"
      }),
      makeBlock("desc-a", "description", {
        title: "Item Description",
        body: "{{description}}"
      }),
      makeBlock("specs-a", "specsTable", {
        rows: [
          { key: "Brand", value: "{{brand}}" },
          { key: "Size", value: "{{size}}" },
          { key: "Color", value: "{{color}}" }
        ]
      }),
      makeBlock("ship-a", "shippingReturns", {
        shipping: "Ships same day when paid before 2PM.",
        returns: "30-day returns accepted."
      })
    ]
  },
  {
    ownerEmail: "demo2@example.com",
    name: "Electronics Warranty Focus",
    category: "Electronics",
    description: "Electronics template optimized for trust and specs clarity.",
    globalStyles: {
      fontFamily: "Verdana, sans-serif",
      textColor: "#0f172a",
      backgroundColor: "#ffffff",
      maxWidth: "920px"
    },
    blocks: [
      makeBlock("title-b", "title", {
        text: "{{title}}",
        subtitle: "Only ${{price}} | {{condition}}"
      }),
      makeBlock("gallery-b", "imageGallery", {
        heading: "Product Photos"
      }),
      makeBlock("desc-b", "description", {
        title: "What's Included",
        body: "{{description}}"
      }),
      makeBlock("specs-b", "specsTable", {
        rows: [
          { key: "Model", value: "{{model}}" },
          { key: "Storage", value: "{{storage}}" },
          { key: "Color", value: "{{color}}" }
        ]
      }),
      makeBlock("ship-b", "shippingReturns", {
        shipping: "Packed securely with insurance and tracking.",
        returns: "14-day returns for items not as described."
      })
    ]
  }
];

module.exports = { dummyUsers, dummyTemplates };
