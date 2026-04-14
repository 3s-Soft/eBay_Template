# eBay Template Designer - Client Flexibility Features

## Overview

The eBay Template Designer now includes **enhanced flexibility** for clients to customize templates extensively. Users can now use 10 block types with advanced styling controls, custom variables, and layout configurations.

---

## New Block Types

### 1. **Rating Block** ⭐
Display product rating and review count to build trust.

**Content Fields:**
- `rating` - Star rating (1-5)
- `reviewCount` - Number of reviews

**Use Case:** Build credibility by showing customer satisfaction

**Example:**
```json
{
  "type": "rating",
  "content": {
    "rating": "4.8",
    "reviewCount": "250+"
  }
}
```

---

### 2. **Social Proof Block** 👥
Display key statistics to build confidence (sold count, positive feedback, response time).

**Content Fields:**
- `items` - Array of proof items:
  - `stat` - The statistic (e.g., "1000+")
  - `label` - Label for the stat (e.g., "Sold")

**Use Case:** Show buyers social proof through metrics

**Example:**
```json
{
  "type": "socialProof",
  "content": {
    "items": [
      { "stat": "2,000+", "label": "Sold" },
      { "stat": "99%", "label": "Positive" },
      { "stat": "24hr", "label": "Response" }
    ]
  }
}
```

---

### 3. **Testimonial Block** 💬
Display customer testimonials or reviews.

**Content Fields:**
- `quote` - Customer testimonial text
- `author` - Customer name/attribution

**Use Case:** Build credibility with real customer feedback

**Example:**
```json
{
  "type": "testimonial",
  "content": {
    "quote": "Excellent product and fast shipping!",
    "author": "John Doe"
  }
}
```

---

### 4. **Call-to-Action Block** 🔔
Create a prominent call-to-action section with button.

**Content Fields:**
- `text` - Main heading text
- `buttonText` - Button label

**Use Case:** Drive conversions with prominent CTA

**Example:**
```json
{
  "type": "cta",
  "content": {
    "text": "Ready to buy?",
    "buttonText": "Purchase Now"
  }
}
```

---

### 5. **Divider Block** ━
Add visual separation between sections.

**Content Fields:** None required

**Use Case:** Improve visual hierarchy and readability

**Example:**
```json
{
  "type": "divider",
  "content": {}
}
```

---

## Advanced Styling Options

Each block now supports **18 styling properties** (up from 8):

### Basic Styling
- `textColor` - Text color (hex, rgb, named)
- `backgroundColor` - Background color
- `fontFamily` - Font type (e.g., "Arial, sans-serif")
- `fontSize` - Text size (e.g., "16px")
- `padding` - Internal spacing (e.g., "16px")
- `margin` - External spacing (e.g., "0 0 14px 0")
- `border` - Border style (e.g., "1px solid #ccc")
- `borderRadius` - Corner roundness (e.g., "10px")

### Advanced Styling ✨
- `fontWeight` - Text boldness (normal, bold, 300, 600, etc.)
- `lineHeight` - Line spacing (e.g., "1.6")
- `textAlign` - Text alignment (left, center, right)
- `boxShadow` - Shadow effect (e.g., "0 4px 8px rgba(0,0,0,0.2)")
- `opacity` - Transparency (0-1)
- `transform` - CSS transforms (e.g., "scale(1.1)")
- `transition` - Animation effects (e.g., "all 0.3s ease")

### Example - Advanced Styled Block
```json
{
  "type": "rating",
  "style": {
    "textColor": "#d4a853",
    "backgroundColor": "#1c1016",
    "fontSize": "18px",
    "fontWeight": "bold",
    "textAlign": "center",
    "boxShadow": "0 4px 8px rgba(0,0,0,0.3)",
    "padding": "20px",
    "borderRadius": "8px",
    "transition": "all 0.3s ease"
  }
}
```

---

## Global Style Configuration

Control overall template appearance with global styles:

```json
{
  "globalStyles": {
    "fontFamily": "'Inter', sans-serif",
    "textColor": "#e8ddd5",
    "backgroundColor": "#0a0608",
    "maxWidth": "860px",
    "accentColor": "#d4a853",        // New
    "secondaryColor": "#dc2626",     // New
    "letterSpacing": "0.5px",        // New
    "alignment": "left"              // New
  }
}
```

---

## Custom Variables

Allow dynamic data insertion with custom variables.

### Defining Custom Variables
```json
{
  "customVariables": [
    {
      "key": "title",
      "label": "Product Title",
      "type": "text",
      "placeholder": "Enter product title",
      "required": true,
      "defaultValue": "My Product"
    },
    {
      "key": "price",
      "label": "Price",
      "type": "number",
      "placeholder": "e.g., 99.99",
      "required": true,
      "defaultValue": "0"
    },
    {
      "key": "releaseDate",
      "label": "Release Date",
      "type": "date",
      "required": false,
      "defaultValue": "2025-01-01"
    }
  ]
}
```

### Supported Variable Types
- `text` - Text input
- `number` - Numeric input
- `email` - Email validation
- `url` - URL validation
- `date` - Date picker

### Using Variables in Blocks
Use double-brace syntax: `{{variableName}}`

```json
{
  "type": "title",
  "content": {
    "text": "{{title}} - Only ${{price}}",
    "subtitle": "Available since {{releaseDate}}"
  }
}
```

---

## Layout Configuration

Control template layout and responsiveness:

```json
{
  "layoutConfig": {
    "columnLayout": "single",      // single, two-column, three-column
    "spacing": "16px",              // Default block spacing
    "responsive": true,             // Mobile-responsive
    "containerPadding": "20px",     // Template padding
    "maxContentWidth": "860px"      // Max width
  }
}
```

---

## Complete Template Example

Here's a complete template using all new features:

```json
{
  "name": "Premium Showcase Template",
  "globalStyles": {
    "fontFamily": "'Inter', sans-serif",
    "textColor": "#e8ddd5",
    "backgroundColor": "#0a0608",
    "maxWidth": "860px",
    "accentColor": "#d4a853"
  },
  "customVariables": [
    {
      "key": "title",
      "label": "Product Title",
      "type": "text",
      "required": true
    },
    {
      "key": "price",
      "label": "Product Price",
      "type": "number",
      "required": true
    }
  ],
  "layoutConfig": {
    "columnLayout": "single",
    "spacing": "16px",
    "responsive": true
  },
  "blocks": [
    {
      "id": "title-1",
      "type": "title",
      "content": {
        "text": "{{title}}",
        "subtitle": "Only ${{price}}"
      },
      "style": {
        "textColor": "#f5ede3",
        "backgroundColor": "#1c1016",
        "fontSize": "28px",
        "fontWeight": "bold",
        "textAlign": "center"
      }
    },
    {
      "id": "rating-1",
      "type": "rating",
      "content": {
        "rating": "5",
        "reviewCount": "250+"
      },
      "style": {
        "textColor": "#d4a853",
        "textAlign": "center",
        "fontSize": "18px"
      }
    },
    {
      "id": "socialproof-1",
      "type": "socialProof",
      "content": {
        "items": [
          { "stat": "2,000+", "label": "Sold" },
          { "stat": "99%", "label": "Positive" },
          { "stat": "24hr", "label": "Response" }
        ]
      },
      "style": {
        "textColor": "#d4a853",
        "textAlign": "center"
      }
    },
    {
      "id": "testimonial-1",
      "type": "testimonial",
      "content": {
        "quote": "Exactly as described. Highly recommended!",
        "author": "John Doe"
      },
      "style": {
        "borderLeft": "4px solid #d4a853",
        "padding": "20px",
        "backgroundColor": "#252025"
      }
    },
    {
      "id": "cta-1",
      "type": "cta",
      "content": {
        "text": "Don't miss this opportunity!",
        "buttonText": "Buy Now"
      },
      "style": {
        "backgroundColor": "#d4a853",
        "textColor": "#0a0608",
        "fontWeight": "bold",
        "fontSize": "18px",
        "textAlign": "center"
      }
    }
  ]
}
```

---

## UI Controls in Template Builder

### Block Palette
- New block types available in Block Palette with emoji icons:
  - 📝 Title
  - 📸 Image Gallery
  - 📋 Description
  - 📊 Specifications
  - 📦 Shipping & Returns
  - ⭐ Rating (NEW)
  - 👥 Social Proof (NEW)
  - 💬 Testimonial (NEW)
  - 🔔 Call to Action (NEW)
  - ━ Divider (NEW)

### Block Editor
- **Content Tab**: Edit block-specific content fields
  - Rating: star rating and review count
  - Social Proof: dynamic item management (add/remove stats)
  - Testimonial: quote and author
  - CTA: heading and button text

- **Style Tab**: Advanced styling controls
  - Basic: Color, font, sizing, spacing
  - Advanced: Font weight, line height, alignment, shadows, transforms

### Live Preview
- Real-time preview of all new block types
- Dynamic variable substitution ({{title}}, {{price}}, etc.)
- Luxury dark theme colors applied automatically

---

## API Integration

### Creating a Template with New Features
```bash
POST /api/templates
{
  "name": "My Template",
  "globalStyles": { ... },
  "customVariables": [ ... ],
  "layoutConfig": { ... },
  "blocks": [ ... ]
}
```

### Generating HTML with Variables
```bash
POST /api/templates/:id/generate
{
  "title": "My Product",
  "price": "99.99",
  "description": "High quality item",
  ...
}
```

### Bulk CSV Generation
CSV columns map to custom variables. New blocks render with the same data substitution.

---

## Browser Compatibility

All new features are compatible with:
- ✓ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✓ eBay HTML policy (no external scripts)
- ✓ Mobile/responsive design
- ✓ Dark mode support

---

## Performance Notes

- **Inline CSS only** - No external stylesheets, complies with eBay policy
- **No JavaScript** - Pure HTML output, fast rendering
- **Optimized blocks** - Minimal HTML footprint
- **Responsive** - Mobile-friendly by default

---

## Best Practices

1. **Styling Consistency**: Use global styles for unified appearance
2. **Content Hierarchy**: Order blocks logically (title → rating → proof → CTA)
3. **Mobile Optimization**: Test responsive layout on mobile devices
4. **Color Contrast**: Ensure readability with sufficient contrast
5. **Variable Naming**: Use clear, intuitive variable names for your clients
6. **Template Testing**: Preview with real data before publishing

---

## Support

For issues or questions, contact support or check documentation at [link to docs].
