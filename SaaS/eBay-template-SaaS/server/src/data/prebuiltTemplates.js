const prebuiltTemplates = [
  {
    slug: "sneakers",
    name: "Sneakers Conversion Pro",
    category: "Sneakers",
    description: "Streetwear-focused listing layout with bold title and specs.",
    isPrebuilt: true,
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
          text: "{{title}} - {{condition}}",
          subtitle: "Now only ${{price}}"
        },
        style: {
          textColor: "#0f172a",
          backgroundColor: "#f8fafc"
        }
      },
      {
        id: "gallery-1",
        type: "imageGallery",
        content: {
          heading: "Product Images"
        }
      },
      {
        id: "desc-1",
        type: "description",
        content: {
          title: "Description",
          body: "{{description}}"
        }
      },
      {
        id: "spec-1",
        type: "specsTable",
        content: {
          rows: [
            { key: "Brand", value: "{{brand}}" },
            { key: "Size", value: "{{size}}" },
            { key: "Color", value: "{{color}}" }
          ]
        }
      },
      {
        id: "shipping-1",
        type: "shippingReturns",
        content: {
          shipping: "Ships in 1 business day with tracking.",
          returns: "30-day returns accepted."
        }
      }
    ]
  },
  {
    slug: "electronics",
    name: "Electronics Trust Builder",
    category: "Electronics",
    description: "Specs-heavy template for gadgets and consumer electronics.",
    isPrebuilt: true,
    globalStyles: {
      fontFamily: "Verdana, sans-serif",
      textColor: "#0b1220",
      backgroundColor: "#ffffff",
      maxWidth: "920px"
    },
    blocks: [
      {
        id: "title-2",
        type: "title",
        content: {
          text: "{{title}}",
          subtitle: "Condition: {{condition}} | Price: ${{price}}"
        }
      },
      {
        id: "gallery-2",
        type: "imageGallery",
        content: {
          heading: "Photos"
        }
      },
      {
        id: "desc-2",
        type: "description",
        content: {
          title: "What's Included",
          body: "{{description}}"
        }
      },
      {
        id: "spec-2",
        type: "specsTable",
        content: {
          rows: [
            { key: "Model", value: "{{model}}" },
            { key: "Storage", value: "{{storage}}" },
            { key: "Color", value: "{{color}}" }
          ]
        }
      },
      {
        id: "shipping-2",
        type: "shippingReturns",
        content: {
          shipping: "Professionally packed and fully insured shipping.",
          returns: "14-day returns accepted if item is not as described."
        }
      }
    ]
  },
  {
    slug: "trading-cards",
    name: "Trading Cards Collector",
    category: "Trading Cards",
    description: "Collector-oriented layout for sports and TCG cards.",
    isPrebuilt: true,
    globalStyles: {
      fontFamily: "Trebuchet MS, sans-serif",
      textColor: "#111827",
      backgroundColor: "#ffffff",
      maxWidth: "840px"
    },
    blocks: [
      {
        id: "title-3",
        type: "title",
        content: {
          text: "{{title}}",
          subtitle: "Grade: {{grade}} | Condition: {{condition}} | Price: ${{price}}"
        }
      },
      {
        id: "gallery-3",
        type: "imageGallery",
        content: {
          heading: "Card Images"
        }
      },
      {
        id: "desc-3",
        type: "description",
        content: {
          title: "Card Details",
          body: "{{description}}"
        }
      },
      {
        id: "spec-3",
        type: "specsTable",
        content: {
          rows: [
            { key: "Set", value: "{{set}}" },
            { key: "Year", value: "{{year}}" },
            { key: "Card Number", value: "{{cardNumber}}" }
          ]
        }
      },
      {
        id: "shipping-3",
        type: "shippingReturns",
        content: {
          shipping: "Shipped in sleeve + top loader + padded mailer.",
          returns: "No returns for graded cards; raw cards 14-day returns."
        }
      }
    ]
  }
];

module.exports = { prebuiltTemplates };
