export const TEMPLATE_VARIABLES = [
  "{{title}}",
  "{{price}}",
  "{{description}}",
  "{{images}}",
  "{{condition}}",
  "{{brand}}",
  "{{size}}",
  "{{color}}"
];

export const BLOCK_DEFAULTS = {
  title: {
    type: "title",
    content: {
      text: "{{title}}",
      subtitle: "Condition: {{condition}} • Price: ${{price}} • Fast Dispatch"
    }
  },
  imageGallery: {
    type: "imageGallery",
    content: {
      heading: "Product Images"
    }
  },
  description: {
    type: "description",
    content: {
      title: "Description",
      body: "{{description}}"
    }
  },
  specsTable: {
    type: "specsTable",
    content: {
      rows: [
        { key: "Brand", value: "{{brand}}" },
        { key: "Condition", value: "{{condition}}" }
      ]
    }
  },
  shippingReturns: {
    type: "shippingReturns",
    content: {
      shipping: "Ships in 1 business day with tracking.",
      returns: "30-day returns accepted."
    }
  }
};

export const DEFAULT_GLOBAL_STYLES = {
  fontFamily: "Arial, sans-serif",
  textColor: "#111827",
  backgroundColor: "#f1f5f9",
  maxWidth: "900px"
};

export const DEFAULT_SAMPLE_DATA = {
  title: "Nike Air Max 90 Infrared",
  price: "129.99",
  description:
    "Excellent condition pair with minimal wear. 100% authentic and ready to ship.",
  condition: "Pre-owned",
  images: "https://picsum.photos/300?1|https://picsum.photos/300?2",
  brand: "Nike",
  size: "US 10",
  color: "Infrared/White"
};
