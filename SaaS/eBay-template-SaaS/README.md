# eBay Template Designer & Listing Generator (SaaS MVP)

Modern full-stack SaaS application for building reusable eBay listing templates and generating eBay-compatible HTML at scale.

## Tech Stack

- **Frontend:** React + Tailwind CSS + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Template Engine:** Handlebars

## Project Structure

```text
eBay-template-SaaS/
├─ client/
│  ├─ src/
│  │  ├─ api/http.js
│  │  ├─ components/
│  │  │  ├─ layout/{Sidebar,Topbar}.jsx
│  │  │  └─ template/{BlockPalette,BuilderCanvas,BlockEditor,GlobalStyleEditor,LivePreview,VariableChips}.jsx
│  │  ├─ constants/template.js
│  │  ├─ context/{AuthContext,ThemeContext}.jsx
│  │  ├─ pages/{LoginPage,SignupPage,DashboardPage,TemplateBuilderPage,MyTemplatesPage,BulkGeneratorPage,SettingsPage}.jsx
│  │  ├─ utils/{templateRuntime,download}.js
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ tailwind.config.cjs
│  └─ postcss.config.cjs
├─ server/
│  ├─ src/
│  │  ├─ app.js
│  │  ├─ server.js
│  │  ├─ config/db.js
│  │  ├─ controllers/{authController,templateController,libraryController,bulkController}.js
│  │  ├─ middleware/{auth,errorHandler}.js
│  │  ├─ models/{User,Template}.js
│  │  ├─ routes/{authRoutes,templateRoutes,libraryRoutes,bulkRoutes}.js
│  │  ├─ services/{templateCompiler,htmlGenerator,prebuiltSeeder}.js
│  │  ├─ data/{prebuiltTemplates,examples}.js
│  │  └─ utils/{sanitize,asyncHandler}.js
│  └─ .env.example
├─ package.json (workspaces)
└─ README.md
```

## Core Features Implemented

1. **JWT Authentication**
2. **Template Builder with block system and drag/drop ordering**
3. **Dynamic Handlebars variables** (`{{title}}`, `{{price}}`, etc.)
4. **eBay-compatible HTML generation** (inline CSS + script sanitization)
5. **Prebuilt Template Library** (Sneakers, Electronics, Trading Cards)
6. **Export options** (copy HTML + download `.html`)
7. **Bulk Generator** (CSV upload + field mapping + multi-listing output)
8. **SaaS dashboard pages** (Dashboard, Builder, My Templates, Bulk, Settings)
9. **Dark/light mode**
10. **Branding settings per user** (logo/colors/font)

## API Routes

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PATCH /api/auth/settings/branding`

### Templates
- `GET /api/templates`
- `POST /api/templates`
- `POST /api/templates/preview`
- `GET /api/templates/:id`
- `PUT /api/templates/:id`
- `DELETE /api/templates/:id`
- `POST /api/templates/:id/generate`
- `POST /api/templates/:id/duplicate`

### Library
- `GET /api/library/templates`

### Bulk
- `POST /api/bulk/generate` (multipart form with `csv`, `templateId`, `mapping`)

## MongoDB Schemas

### User
- `name`, `email`, `passwordHash`
- `brandSettings.logoUrl`
- `brandSettings.primaryColor`
- `brandSettings.secondaryColor`
- `brandSettings.fontFamily`

### Template
- `user` (nullable for prebuilt)
- `slug` (for prebuilt templates)
- `name`, `category`, `description`
- `blocks[]` (`title`, `imageGallery`, `description`, `specsTable`, `shippingReturns`)
- `globalStyles`
- `handlebarsTemplate`
- `isPrebuilt`

## Example Template JSON

```json
{
  "name": "Sneakers Conversion Pro",
  "category": "Sneakers",
  "globalStyles": {
    "fontFamily": "Arial, sans-serif",
    "textColor": "#111827",
    "backgroundColor": "#ffffff",
    "maxWidth": "900px"
  },
  "blocks": [
    {
      "id": "title-1",
      "type": "title",
      "content": {
        "text": "{{title}}",
        "subtitle": "Condition: {{condition}} | Price: ${{price}}"
      }
    },
    {
      "id": "gallery-1",
      "type": "imageGallery",
      "content": { "heading": "Product Images" }
    },
    {
      "id": "desc-1",
      "type": "description",
      "content": {
        "title": "Description",
        "body": "{{description}}"
      }
    }
  ]
}
```

## Example Generated HTML

```html
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
```

## Run Locally

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
npm install
npm run dev
```
