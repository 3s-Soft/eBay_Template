<div align="center">

# 🎨 eBay Template Portfolio

### Professional eBay Listing Template Library by [3s-Soft](https://3s-soft.com/)

[![Live Preview](https://img.shields.io/badge/Live%20Preview-3s--soft.github.io-6366f1?style=for-the-badge&logo=github)](https://3s-soft.github.io/eBay_Template/)
[![Templates](https://img.shields.io/badge/Templates-52-06b6d4?style=for-the-badge)](https://3s-soft.github.io/eBay_Template/)
[![License](https://img.shields.io/badge/License-Portfolio%20Only-f43f5e?style=for-the-badge)](https://3s-soft.com/)
[![Website](https://img.shields.io/badge/Website-3s--soft.com-10b981?style=for-the-badge)](https://3s-soft.com/)

</div>

---

## 📌 Overview

This repository is a **portfolio showcase** of professional eBay HTML listing templates designed and delivered by **3s-Soft** for real client stores. It includes a fully interactive portfolio page with live template previews, search, filtering by client, and auto-sync with the filesystem.

> ⚠️ **Showcase only.** Templates in this repository are real client deliverables and are **not licensed for redistribution or direct reuse**. Custom production-ready templates are available on request — [contact us](https://3s-soft.com/).

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖥️ **Live Preview** | Each template renders in a scaled iframe card |
| 🔍 **Search** | Instant full-text search across all template names and paths |
| 🗂️ **Filter by Client** | One-click filter buttons per client category |
| ⚡ **Auto-Sync** | Portfolio polls `templates.json` every 5 s — new/deleted templates appear automatically |
| 🔄 **Manual Refresh** | Refresh button to force-reload the manifest instantly |
| ⊞ **Grid / List view** | Toggle between grid cards and compact list |
| 📱 **Responsive** | Works on all screen sizes |
| 🎨 **Tailwind CSS v4** | Styled with `@tailwindcss/browser@4` CDN — no build step |

---

## 🗂️ Repository Structure

```
eBay_Template/
│
├── index.html              ← Portfolio page (Tailwind v4)
├── scan.py                 ← Scans directories → generates templates.json
├── dev-server.py           ← HTTP server + live file watcher
├── templates.json          ← Auto-generated manifest (git-ignored)
│
├── Ben Radnor/             ← 31 templates (IT parts store)
│   ├── 123956830199.html
│   └── ...
│
├── Lana_sabir/             ← 11 templates (cosmetics/beauty store)
│   ├── Project 1/index.html
│   ├── Project 2/index.html
│   └── ...
│
├── K9handler2024/          ← 8 templates (dog handler / apparel)
│   ├── index.html
│   ├── template-v2-street.html
│   └── ...
│
├── ROUND LAB/              ← 1 template (skincare brand)
│   └── index.html
│
└── Vector/                 ← 1 template
    └── index.html
```

---

## 🚀 Running Locally

**Requirements:** Python 3.10+

### Option A — Quick scan + static server

```bash
# 1. Generate the manifest
python scan.py

# 2. Serve files (any static server works)
python -m http.server 8099

# 3. Open http://localhost:8099/
```

### Option B — Live dev server with auto-watch *(recommended)*

```bash
python dev-server.py
# → Serves at http://localhost:8099/
# → Auto-rescans templates.json whenever HTML files are added/removed/renamed
```

### Option C — Watch-only (no server)

```bash
python scan.py --watch           # rescans every 3 s
python scan.py --watch --interval 5   # custom interval
```

The portfolio page **polls `templates.json` every 5 seconds** — any change detected by the watcher will appear in the browser automatically without a manual refresh.

---

## 📁 How the Dynamic System Works

```
Filesystem change         scan.py watcher          index.html (browser)
(add / delete .html)  →  regenerates               polls templates.json
                         templates.json        →   every 5 s → re-renders
```

1. `scan.py` walks all client directories and builds `templates.json`
2. `dev-server.py` runs `scan.py` at startup, then polls the filesystem every 3 s
3. `index.html` fetches `templates.json` on load and re-fetches every 5 s — only re-renders if the `generated` timestamp changed

---

## 🎯 What This Showcases

- **Clean, semantic HTML** — eBay-compliant markup with no forbidden tags
- **eBay-safe CSS** — Inline and embedded styles, no external dependencies in templates
- **Brand-matched designs** — Each client gets a unique colour palette, typography, and layout
- **Mobile-first approach** — Responsive layouts that look right on any device
- **Scalable workflow** — Consistent template structure across 50+ listings per client
- **Modern tooling** — Portfolio built with Tailwind v4, Python automation, IntersectionObserver

---

## 🛠️ Services Offered

| Service | Details |
|---|---|
| Custom eBay Template | Brand-matched, category-specific HTML listing template |
| Bulk Listing Setup | Consistent design applied across entire product catalogue |
| Store Branding | Unified header, footer, and colour scheme across all listings |
| Template Variants | Multiple layout versions (minimal, luxury, cyber, etc.) |
| Mobile Optimisation | Templates verified across desktop and mobile eBay views |

📩 **Request a custom template →** [3s-soft.com](https://3s-soft.com/)

---

## 👤 About

**Jashedul Islam Shaun** — eCommerce Listing & Template Specialist

- ⭐ Top-Rated Freelancer on Upwork  
- 🏆 Level-2 Seller on Fiverr  
- 🛒 Specialised in eBay, Amazon, and Shopify product listings  
- 🎨 Focused on conversion-friendly, brand-consistent presentation  

🔗 GitHub: [github.com/3s-Soft](https://github.com/3s-Soft)  
🌐 Website: [3s-soft.com](https://3s-soft.com/)

---

## 📜 License

All templates in this repository are **real client deliverables** shared for portfolio and showcase purposes only.

- ❌ Not licensed for direct use in live eBay listings  
- ❌ Not for redistribution or resale  
- ✅ Portfolio display and skill demonstration only  

All rights reserved © [3s-Soft](https://3s-soft.com/)
