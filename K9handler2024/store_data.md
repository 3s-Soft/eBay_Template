# K9handler2024 — eBay Store Reference Data

> Generated: 2026-04-12  
> Purpose: Template design reference — store branding, product data, and listing patterns for K9handler2024.

---

## 🏪 Store Overview

| Field | Value |
|---|---|
| **Store Name** | K9handler2024 |
| **Store URL** | https://www.ebay.co.uk/str/k9handler2024 |
| **Feedback** | 100% Positive |
| **Items Sold** | 325 |
| **Followers** | 9 |
| **Categories** | Women's Shoes · Men's Shoes · Kids |

### Store Description
> "Originally created to supply top-quality preloved modern and vintage clothing. Now specializing in premium trainers/sneakers (new and preloved). All preloved items are washed and refreshed before listing."

### Brand Identity
- **Colour Scheme:** Deep Purple (`#1a0a2e`) + Gold (`#f5c842`) accents
- **Template File:** `index.html`
- **USP:** Natural-light photography, washed & refreshed preloved, honest condition reports

---

## 📦 Active Listings (as of April 2026)

| Item | Price (GBP) | Condition | UK Size |
|---|---|---|---|
| Nike Air Max Plus III TN White Red Black | £67.75 | Pre-owned – Good | UK 9.5 |
| Adidas ZX 700 BE LO Womens White 2015 | £33.64 | Pre-owned – Excellent | UK 9 |
| Nike Air Max 95 Essentials Midnight Navy 2017 | £243.42 | New Without Box | UK 11 |
| Nike SB Dunk Low "Firecracker" Red | £333.10 | *(not scraped)* | UK 8 |
| Nike Vomero Premium Hyper Pink | £130.70 | *(not scraped)* | Women's 6.5 |

---

## 🛒 Product Detail Records

---

### 1. Adidas ZX 700 BE LO — Women's

- **eBay Item ID:** `178028168693`
- **URL:** https://www.ebay.co.uk/itm/178028168693
- **Full Title:** Adidas ZX 700 BE LO Womens White 2015 Trainers UK 9 Classic Originals
- **Price:** £33.64
- **Condition:** Pre-owned – Excellent

#### Item Specifics
| Field | Value |
|---|---|
| Brand | adidas |
| Model | ZX 700 BE LO |
| Style | Sneaker |
| Department | Women |
| UK Shoe Size | 9 |
| Colour | White |
| Upper Material | Suede Leather |
| Lining Material | Leather |
| Closure | Lace-Up |
| Type | Trainer |

#### Description
> "Preloved but excellent condition. Soles: Excellent. No box. Photos taken in natural lighting."

#### Shipping & Returns
- **UK Postage:** £3.69 economy delivery
- **Returns:** 30 days, buyer pays return postage

---

### 2. Nike Air Max 95 Essentials — Men's/Unisex

- **eBay Item ID:** `178028163678`
- **URL:** https://www.ebay.co.uk/itm/178028163678
- **Full Title:** Nike Air Max 95 Essentials Midnight Navy 2017 UK 11 Very Rare Retro OG Colourway
- **Price:** £243.42
- **Condition:** New Without Box

#### Item Specifics
| Field | Value |
|---|---|
| Brand | Nike |
| Model | Nike Air Max 95 |
| Style | Sneaker |
| Department | Unisex Adults |
| UK Size | 11 |
| US Size | 12 |
| Colour | Midnight Navy |
| Upper Material | Leather / Mixed |
| Outsole Material | Rubber |
| Features | Comfort, Overpronation Support |

#### Description
> "Very rare 2017 Essentials Midnight Navy trainers. New without box condition. UK size 11."

#### Shipping & Returns
- **UK Postage:** £3.69 economy delivery
- **Returns:** 30 days

---

### 3. Nike Air Max Plus III TN — Men's

- **eBay Item ID:** `178038046129`
- **URL:** https://www.ebay.co.uk/itm/178038046129
- **Full Title:** Nike Air Max Plus III TN White Red Black UK 9.5 US 10.5 Trainers Running Mens
- **Price:** £67.75
- **Condition:** Pre-owned – Good

#### Item Specifics
| Field | Value |
|---|---|
| Brand | Nike |
| Model | Nike Air Max Plus III |
| Style | Sneaker |
| Department | Men |
| UK Size | 9.5 |
| US Size | 10.5 |
| Year/Release | 2023 / 2024 |
| Colour | White / Black / Red |
| Upper Material | Mesh / Mixed |
| Features | Comfort, Cushioned, Breathable, Arch Support |
| Activity | Running & Jogging · Gym & Training |

#### Description
> "Preloved but Good condition. Soles: Good condition. White/Black/Red colourway. No box."

#### Shipping & Returns
- **UK Postage:** Varies (local pickup or standard postage)
- **Returns:** No returns accepted

---

## 🎨 Template Design Tokens

```css
/* Core Colour Palette */
--purple-dark:  #1a0a2e;
--purple-mid:   #2d1554;
--purple-light: #4c2a8a;
--gold:         #f5c842;
--gold-light:   #fde98a;
--gold-dark:    #c9a200;
--text-muted:   #a89ec8;
--off-white:    #f0eef8;
--border:       rgba(245,200,66,0.18);
--card-bg:      rgba(45,21,84,0.55);
--radius:       12px;
```

---

## 📝 Listing Template Sections (index.html)

| Section | Description |
|---|---|
| **Store Header** | Logo (SVG dog silhouette), store name, "Top Rated" badge |
| **Hero Strip** | Trust tagline + 5-star display |
| **Product Title** | `<h2>` title + coloured badge tags (condition / year / rarity) |
| **Image Gallery** | 5-slot CSS grid — swap `<div>` for `<img src="">` per listing |
| **Item Specifics** | 2-column spec card grid (`eb-spec-row`) |
| **Condition Report** | Visual meter + bullet-point condition notes |
| **Description** | Rich text + gold italic callout `eb-highlight-box` |
| **Key Features** | Icon + title + description list (`eb-feature-item`) |
| **Why Buy From Us** | 6 trust pillars grid (`eb-pillar`) |
| **Shipping & Payment** | Styled `<table>` with dispatch, postage, returns, payment, sizing |
| **Footer** | Store name, strapline, 4 quick links |

### Condition Meter Guide
| Condition | Meter Width | Colour |
|---|---|---|
| New / Excellent | 90–95% | `#6ee7b7` (green) |
| Very Good | 75% | `#86efac` |
| Good | 60–65% | `var(--gold)` |
| Fair | 35–40% | `#fca5a5` (red) |

### Badge Tag Colour Classes
| Class | Use Case |
|---|---|
| `eb-tag` (default gold) | Condition, rarity, year |
| `eb-tag green` | Authenticity, verified |
| `eb-tag blue` | Release year, model info |
| `eb-tag red` | Warnings, no box, missing items |

---

## 🔄 Reuse Instructions

When creating a new listing from `index.html`:

1. **Search** for `<!-- ✏️ EDIT:` comments — every field to change is marked.
2. **Replace** product title in `<h2>`.
3. **Update** `eb-tag` badges for condition/year.
4. **Swap** `eb-img-slot` divs with `<img src="EBAY_IMAGE_URL" ...>` tags.
5. **Fill** `eb-spec-row` values with item specifics.
6. **Set** condition meter width + colour.
7. **Write** condition notes and description paragraphs.
8. **Update** shipping table if policy differs.

---

*Last updated: 2026-04-12 | Maintained by: K9handler2024 template project*
