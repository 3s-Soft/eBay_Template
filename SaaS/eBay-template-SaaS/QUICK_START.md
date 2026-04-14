# Quick Start Guide - eBay Template Designer

## 🚀 Getting Started in 5 Minutes

### Step 1: Access the Application
```
Frontend: http://localhost:5173
Backend API: http://localhost:5001/api
```

### Step 2: Login with Demo Account
Use one of these demo accounts (pre-created in database):

**Account 1:**
- Email: `demo1@example.com`
- Password: `Password123!`

**Account 2:**
- Email: `demo2@example.com`
- Password: `Password123!`

### Step 3: Explore the Dashboard
Once logged in, you'll see:
- **Dashboard** - Overview and quick actions
- **Template Builder** - Create and edit templates
- **My Templates** - View all your templates
- **Bulk Generator** - Generate multiple listings from CSV
- **Settings** - Account and branding options

---

## 📚 What's New

### 5 New Block Types
1. **⭐ Rating Block** - Display star ratings
2. **👥 Social Proof Block** - Show statistics
3. **💬 Testimonial Block** - Customer quotes
4. **🔔 Call-to-Action Block** - Purchase buttons
5. **━ Divider Block** - Visual separators

### 10 Advanced Styling Options
- Font weight, line height, text alignment
- Box shadows, opacity, transforms, transitions
- Plus the original 8 properties

### Custom Variables
- Define unlimited custom variables
- Support for: text, number, email, url, date
- Full integration with templates

### Layout Configuration
- Column options (single, two, three)
- Responsive design control
- Spacing and padding configuration

---

## 🎯 Common Tasks

### Create a New Template
1. Click "Create Template" on dashboard
2. Enter template name and category
3. Drag blocks from palette to canvas
4. Edit block content in the editor
5. Customize styling with advanced options
6. Click "Save Template"

### Edit Block Content
1. Select a block in the canvas
2. Right panel shows "Block Content"
3. Edit fields specific to that block type
4. Preview updates in real-time

### Apply Advanced Styling
1. Select a block
2. Scroll to "Block Style" section
3. Set styling properties:
   - Color, size, spacing (basic)
   - Font weight, shadows, transforms (advanced)
4. See changes in preview instantly

### Generate HTML
1. Click "Generate HTML" button
2. Choose "Copy to Clipboard" or "Download"
3. HTML is eBay-compliant (no scripts, inline CSS)

### Bulk Generate from CSV
1. Go to "Bulk Generator"
2. Upload CSV file with product data
3. Map CSV columns to template variables
4. Click "Generate All"
5. Download ZIP with all listings

---

## 🎨 Template Features

### Global Styles
Set appearance for entire template:
- Font family and default colors
- Accent and secondary colors
- Default spacing and alignment

### Block Types Available
| Block | Purpose | Use For |
|-------|---------|---------|
| Title | Main heading | Product name & subtitle |
| Image Gallery | Product photos | Multiple images |
| Description | Detailed content | Full description |
| Specs Table | Key details | Brand, size, color, etc. |
| Shipping & Returns | Logistics info | Shipping & return terms |
| Rating ⭐ | Star rating | Build credibility |
| Social Proof 👥 | Statistics | Items sold, positive % |
| Testimonial 💬 | Customer quotes | Social proof |
| Call-to-Action 🔔 | Purchase button | Drive conversions |
| Divider ━ | Visual separator | Improve readability |

### Variables (Dynamic Data)
Insert variables in block content using `{{variableName}}` syntax:
- `{{title}}` - Product title
- `{{price}}` - Product price
- `{{description}}` - Product description
- `{{images}}` - Product images
- `{{condition}}` - Item condition
- `{{brand}}` - Brand name
- `{{size}}` - Size
- `{{color}}` - Color
- Plus any custom variables you define

---

## 🔧 Template Example

### Simple Example
```json
{
  "name": "Basic Listing",
  "globalStyles": {
    "fontFamily": "Arial, sans-serif",
    "backgroundColor": "#0a0608",
    "textColor": "#e8ddd5"
  },
  "blocks": [
    {
      "type": "title",
      "content": { "text": "{{title}}" }
    },
    {
      "type": "rating",
      "content": { "rating": "5", "reviewCount": "100+" }
    },
    {
      "type": "cta",
      "content": { "text": "Buy Now!", "buttonText": "Purchase" }
    }
  ]
}
```

### Advanced Example
```json
{
  "name": "Premium Template",
  "customVariables": [
    { "key": "title", "label": "Product Title", "type": "text", "required": true },
    { "key": "price", "label": "Price", "type": "number", "required": true }
  ],
  "blocks": [
    {
      "type": "title",
      "content": { "text": "{{title}} - ${{price}}" },
      "style": {
        "fontSize": "28px",
        "fontWeight": "bold",
        "textAlign": "center",
        "boxShadow": "0 4px 8px rgba(0,0,0,0.3)"
      }
    }
  ]
}
```

---

## 📋 Documentation Files

Quick reference guides included:

1. **LOGIN_CREDENTIALS.md** - Login info and credentials
2. **ENHANCED_FEATURES.md** - All new features explained
3. **FLEXIBILITY_GUIDE.md** - Complete technical reference
4. **FLEXIBILITY_SUMMARY.md** - Feature overview
5. **FLEXIBILITY_IMPLEMENTATION.md** - Implementation details

---

## ⚙️ Server Commands

```bash
# Start development server
npm run dev

# Build production bundles
npm run build

# Run database seed
cd server && npm run seed:dummy

# Run linter
npm run lint
```

---

## 🐛 Troubleshooting

### Login Issues
- Verify email and password are exact (case-sensitive)
- Check that server is running on port 5001
- Clear browser cache and try again
- Check browser console (F12) for errors

### Templates Not Showing
- Make sure you're logged into correct account
- Templates are stored per user
- Refresh page if just created

### HTML Generation Fails
- Ensure all required variables are set
- Check for empty block content
- Verify CSS is valid

### Server Won't Start
- Check that ports 5001 (server) and 5173 (client) are available
- Ensure MongoDB is running on localhost:27017
- Check .env files are properly configured

---

## 🎓 Best Practices

1. **Organize Blocks Logically**
   - Title → Images → Description → Specs → Trust Elements → CTA → Shipping

2. **Use Global Styles for Consistency**
   - Set colors and fonts globally
   - Override per-block only when needed

3. **Create Custom Variables**
   - Match your product data structure
   - Use descriptive names

4. **Mobile Testing**
   - Preview on mobile devices
   - Ensure responsive layout works

5. **Trust Building**
   - Include rating, social proof, testimonial
   - Place CTA prominently

---

## 📞 Need Help?

Refer to documentation files:
- `ENHANCED_FEATURES.md` - Feature reference
- `FLEXIBILITY_GUIDE.md` - Technical details
- `LOGIN_CREDENTIALS.md` - Login help
- Browser console (F12) - Error messages

---

## ✨ Key Features Summary

✅ 10 block types  
✅ 18 styling properties  
✅ Custom variables support  
✅ Layout configuration  
✅ Live preview  
✅ HTML export (eBay-compliant)  
✅ Bulk CSV generation  
✅ Mobile responsive  
✅ Dark mode support  
✅ Luxury theme styling  

---

**Version**: 2.0 (Enhanced Flexibility)  
**Last Updated**: April 15, 2026  
**Status**: ✅ Production Ready
