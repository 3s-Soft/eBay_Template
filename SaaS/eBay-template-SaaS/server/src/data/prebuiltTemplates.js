const baseStyle = {
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

const prebuiltTemplates = [
  {
    slug: "sneakers",
    name: "Sneakers Conversion Pro",
    category: "Sneakers",
    description: "Premium storefront look with bold hero, gallery, and trust-focused detail sections.",
    isPrebuilt: true,
    globalStyles: {
      fontFamily: "Arial, sans-serif",
      textColor: "#111827",
      backgroundColor: "#f1f5f9",
      maxWidth: "920px"
    },
    blocks: [
      {
        id: "title-1",
        type: "title",
        content: {
          text: "{{title}}",
          subtitle: "Condition: {{condition}} • Price: ${{price}} • 100% Authentic"
        },
        style: {
          ...baseStyle,
          textColor: "#f8fafc",
          backgroundColor: "#0f172a",
          border: "1px solid rgba(245, 200, 66, 0.35)"
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
    description: "Professional electronics format designed for clarity, confidence, and quick conversion.",
    isPrebuilt: true,
    globalStyles: {
      fontFamily: "Verdana, sans-serif",
      textColor: "#0f172a",
      backgroundColor: "#f1f5f9",
      maxWidth: "940px"
    },
    blocks: [
      {
        id: "title-2",
        type: "title",
        content: {
          text: "{{title}}",
          subtitle: "Condition: {{condition}} • Price: ${{price}} • Fully Tested"
        },
        style: {
          ...baseStyle,
          textColor: "#f8fafc",
          backgroundColor: "#0f172a",
          border: "1px solid rgba(245, 200, 66, 0.35)",
          fontFamily: "Verdana, sans-serif"
        }
      },
      {
        id: "gallery-2",
        type: "imageGallery",
        content: {
          heading: "Device Photos & Closeups"
        },
        style: {
          ...baseStyle,
          fontFamily: "Verdana, sans-serif"
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
          ...baseStyle,
          fontFamily: "Verdana, sans-serif"
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
          ...baseStyle,
          fontFamily: "Verdana, sans-serif"
        }
      }
    ]
  },
  {
    slug: "trading-cards",
    name: "Trading Cards Collector",
    category: "Trading Cards",
    description: "Collector-grade visual layout that highlights condition, grading, and card details.",
    isPrebuilt: true,
    globalStyles: {
      fontFamily: "Trebuchet MS, sans-serif",
      textColor: "#111827",
      backgroundColor: "#f1f5f9",
      maxWidth: "900px"
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
          textColor: "#f8fafc",
          backgroundColor: "#0f172a",
          border: "1px solid rgba(245, 200, 66, 0.35)",
          fontFamily: "Trebuchet MS, sans-serif"
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
          ...baseStyle,
          fontFamily: "Trebuchet MS, sans-serif"
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
          ...baseStyle,
          fontFamily: "Trebuchet MS, sans-serif"
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
          ...baseStyle,
          fontFamily: "Trebuchet MS, sans-serif"
        }
      }
    ]
  }
];

module.exports = { prebuiltTemplates };
