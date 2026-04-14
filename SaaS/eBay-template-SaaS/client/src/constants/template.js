export const TEMPLATE_VARIABLES = [
  "{{title}}",
  "{{price}}",
  "{{description}}",
  "{{images}}",
  "{{condition}}",
  "{{brand}}",
  "{{size}}",
  "{{color}}",
  "{{model}}",
  "{{year}}",
  "{{rating}}",
  "{{reviewCount}}"
];

export const BLOCK_TYPES = [
  { id: "title", name: "Title Block", icon: "📝" },
  { id: "imageGallery", name: "Image Gallery", icon: "📸" },
  { id: "description", name: "Description", icon: "📋" },
  { id: "specsTable", name: "Specifications", icon: "📊" },
  { id: "shippingReturns", name: "Shipping & Returns", icon: "📦" },
  { id: "rating", name: "Rating", icon: "⭐" },
  { id: "socialProof", name: "Social Proof", icon: "👥" },
  { id: "testimonial", name: "Testimonial", icon: "💬" },
  { id: "cta", name: "Call to Action", icon: "🔔" },
  { id: "divider", name: "Divider", icon: "━" }
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
  },
  rating: {
    type: "rating",
    content: {
      rating: "5",
      reviewCount: "100"
    }
  },
  socialProof: {
    type: "socialProof",
    content: {
      items: [
        { stat: "1000+", label: "Sold" },
        { stat: "99%", label: "Positive" },
        { stat: "24hr", label: "Response" }
      ]
    }
  },
  testimonial: {
    type: "testimonial",
    content: {
      quote: "Excellent product and fast shipping!",
      author: "Satisfied Customer"
    }
  },
  cta: {
    type: "cta",
    content: {
      text: "Ready to buy?",
      buttonText: "Purchase Now"
    }
  },
  divider: {
    type: "divider",
    content: {}
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
