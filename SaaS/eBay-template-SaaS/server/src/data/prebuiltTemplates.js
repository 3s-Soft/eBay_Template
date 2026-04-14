const baseStyle = {
  textColor: "#e8ddd5",
  backgroundColor: "#1c1016",
  fontFamily: "'Inter', sans-serif",
  fontSize: "13px",
  padding: "16px",
  margin: "0 0 14px 0",
  borderRadius: "2px",
  border: "1px solid rgba(212, 168, 83, 0.14)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
};

const prebuiltTemplates = [
  {
    slug: "sneakers",
    name: "Sneakers Conversion Pro",
    category: "Sneakers",
    description: "Luxury dark theme with premium typography and sophisticated styling.",
    isPrebuilt: true,
    globalStyles: {
      fontFamily: "'Inter', sans-serif",
      textColor: "#e8ddd5",
      backgroundColor: "#0a0608",
      maxWidth: "860px"
    },
    blocks: [
      {
        id: "title-1",
        type: "title",
        content: {
          text: "{{title}}",
          subtitle: "Condition: {{condition}} • Price: ${{price}}"
        },
        style: {
          ...baseStyle,
          textColor: "#f5ede3",
          backgroundColor: "#1c1016",
          border: "1px solid rgba(212, 168, 83, 0.14)"
        }
      },
      {
        id: "gallery-1",
        type: "imageGallery",
        content: {
          heading: "Detailed Product Images"
        },
        style: {
          ...baseStyle
        }
      },
      {
        id: "desc-1",
        type: "description",
        content: {
          title: "Why Buyers Love This Pair",
          body:
            "{{description}}\n\nStored smoke-free, packed carefully, and shipped quickly with tracking."
        },
        style: {
          ...baseStyle
        }
      },
      {
        id: "spec-1",
        type: "specsTable",
        content: {
          rows: [
            { key: "Brand", value: "{{brand}}" },
            { key: "Size", value: "{{size}}" },
            { key: "Colorway", value: "{{color}}" },
            { key: "Condition", value: "{{condition}}" }
          ]
        },
        style: {
          ...baseStyle
        }
      },
      {
        id: "shipping-1",
        type: "shippingReturns",
        content: {
          shipping: "Ships within 1 business day in protective double-box packaging.",
          returns: "30-day returns accepted if item is returned in original condition."
        },
        style: {
          ...baseStyle
        }
      }
    ]
  },
  {
    slug: "electronics",
    name: "Electronics Trust Builder",
    category: "Electronics",
    description: "Professional luxury format with sophisticated styling for electronics.",
    isPrebuilt: true,
    globalStyles: {
      fontFamily: "'Inter', sans-serif",
      textColor: "#e8ddd5",
      backgroundColor: "#0a0608",
      maxWidth: "860px"
    },
    blocks: [
      {
        id: "title-2",
        type: "title",
        content: {
          text: "{{title}}",
          subtitle: "Condition: {{condition}} • Price: ${{price}}"
        },
        style: {
          ...baseStyle,
          textColor: "#f5ede3",
          backgroundColor: "#1c1016",
          border: "1px solid rgba(212, 168, 83, 0.14)"
        }
      },
      {
        id: "gallery-2",
        type: "imageGallery",
        content: {
          heading: "Device Photos & Closeups"
        },
        style: {
          ...baseStyle
        }
      },
      {
        id: "desc-2",
        type: "description",
        content: {
          title: "What's Included",
          body:
            "{{description}}\n\nEvery item is inspected, cleaned, and securely packed before shipping."
        },
        style: {
          ...baseStyle,
          fontFamily: "Verdana, sans-serif"
        }
      },
      {
        id: "spec-2",
        type: "specsTable",
        content: {
          rows: [
            { key: "Model", value: "{{model}}" },
            { key: "Storage", value: "{{storage}}" },
            { key: "Color", value: "{{color}}" },
            { key: "Condition", value: "{{condition}}" }
          ]
        },
        style: {
          ...baseStyle
        }
      },
      {
        id: "shipping-2",
        type: "shippingReturns",
        content: {
          shipping: "Professionally packed with insurance and tracking for secure delivery.",
          returns: "14-day returns for items not matching listing details."
        },
        style: {
          ...baseStyle
        }
      }
    ]
  },
  {
    slug: "trading-cards",
    name: "Trading Cards Collector",
    category: "Trading Cards",
    description: "Collector-grade luxury layout for premium trading cards.",
    isPrebuilt: true,
    globalStyles: {
      fontFamily: "'Inter', sans-serif",
      textColor: "#e8ddd5",
      backgroundColor: "#0a0608",
      maxWidth: "860px"
    },
    blocks: [
      {
        id: "title-3",
        type: "title",
        content: {
          text: "{{title}}",
          subtitle: "Grade: {{grade}} • Condition: {{condition}} • Price: ${{price}}"
        },
        style: {
          ...baseStyle,
          textColor: "#f5ede3",
          backgroundColor: "#1c1016",
          border: "1px solid rgba(212, 168, 83, 0.14)"
        }
      },
      {
        id: "gallery-3",
        type: "imageGallery",
        content: {
          heading: "Front / Back / Surface Images"
        },
        style: {
          ...baseStyle,
          fontFamily: "Trebuchet MS, sans-serif"
        }
      },
      {
        id: "desc-3",
        type: "description",
        content: {
          title: "Collector Notes",
          body:
            "{{description}}\n\nCard handled with gloves and protected immediately after photography."
        },
        style: {
          ...baseStyle
        }
      },
      {
        id: "spec-3",
        type: "specsTable",
        content: {
          rows: [
            { key: "Set", value: "{{set}}" },
            { key: "Year", value: "{{year}}" },
            { key: "Card Number", value: "{{cardNumber}}" },
            { key: "Condition", value: "{{condition}}" }
          ]
        },
        style: {
          ...baseStyle
        }
      },
      {
        id: "shipping-3",
        type: "shippingReturns",
        content: {
          shipping: "Ships in sleeve + top loader + team bag + rigid mailer for protection.",
          returns: "Raw cards: 14-day returns. Graded cards: no returns unless damaged in transit."
        },
        style: {
          ...baseStyle
        }
      }
    ]
  }
];

module.exports = { prebuiltTemplates };
