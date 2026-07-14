# logUs Studio Brand Page — Planning Document

> **Status:** Planning complete. Ready for local development.  
> **Domain:** logusstudio.com  
> **Repo:** brandpage

---

## Overview

**logusstudio.com** is the brand hub for **logUs Studio** — not an app landing page, but a quiet identity page that shows what the studio believes and builds.

**One-line definition:**

> A calm, single-page brand hub for an independent software studio that builds small products to help people remember more.

---

## Brand Identity

| Element | Definition |
|---------|------------|
| Company name | logUs Studio |
| Brand / Logo | `logUs[:]` |
| Service naming (full) | `logUs: OOO` |
| Service naming (short) | `[:] OOO` |
| Domain | logusstudio.com |
| Contact | logus.naro@gmail.com |
| Location | Based in Korea |

### Decisions (locked)

| Item | Decision |
|------|----------|
| Language | English only (v1) |
| Personal name | Not shown on site |
| Tone | Calm, warm, slightly premium — not productivity/SaaS startup |
| SNS | No accounts yet — admin supports add/publish/unpublish/delete |

---

## Philosophy & Copy

### Philosophy

```
We don't build products
to make people do more.

We build products
that help people remember more.

Little things.
Your story.
```

### Studio

```
logUs Studio

Independent software studio.

We build small products
for everyday life.

Based in Korea.
```

### Contact

```
Let's build little things together.

logus.naro@gmail.com
```

### Hero

- **Tagline:** Little things. Your story.
- **Subline:** Independent software studio based in Korea.

---

## Visual Direction

### Core principle: texture and typography over color

Logo is already **white background + black text + blinking `:`** in `[:]`. The site follows the same tone.

| Element | Spec |
|---------|------|
| Background | White or very light warm white (`#FFFFFF` / `#FAFAF8`) |
| Text | Black / dark gray (`#1A1A1A`) |
| Logo | `logUs[:]` — `:` blink effect (reuse in Hero) |
| Texture | Subtle paper grain on Philosophy / Studio sections only |
| Accent | Coral (`~#FF6B5B`) — used sparingly |

### Where to use coral (sparingly)

| Element | Usage |
|---------|-------|
| `:` blink | Optional: coral blink to match accent |
| Link hover | Underline or color shift |
| `Coming soon` badge | Small label |
| Section dividers | 1px accent line |
| CTA button | `Say hello` only |

**Do not use coral for:** large backgrounds, body text, full product cards.

### Paper texture

- Apply only to Philosophy / Studio section backgrounds
- Hero stays clean white so logo blink is visible
- Low opacity on mobile

### Typography

- **logUs / logo:** geometric sans
- **Body / philosophy:** readable sans or humanist sans, generous line-height

---

## Page Structure

Single-page scroll. Five sections.

```
┌──────────────────────────────────────────┐
│  HERO                                    │
│  logUs[:]  (: blink)                     │
│  Little things. Your story.        [CMS] │
│  Independent software studio...    [CMS] │
├──────────────────────────────────────────┤
│  PHILOSOPHY  [paper texture]       [CMS] │
├──────────────────────────────────────────┤
│  STUDIO      [paper texture]       [CMS] │
├──────────────────────────────────────────┤
│  PRODUCTS  (published only; hidden if 0) │
│  ┌────────────────┐                      │
│  │ [:] bebe       │  Coming soon   [CMS] │
│  │ one-liner      │                      │
│  └────────────────┘                      │
├──────────────────────────────────────────┤
│  CONTACT                           [CMS] │
│  Let's build little things together.     │
│  logus.naro@gmail.com                    │
│  [SNS icons — published + url only]      │
├──────────────────────────────────────────┤
│  FOOTER                                  │
│  © 2026 logUs Studio                     │
└──────────────────────────────────────────┘
```

### UX principles

1. Mobile-first
2. Scroll ends in 2–3 swipes
3. Minimal animation (fade only)
4. No dark mode in v1
5. No blog, careers, or complex i18n in v1

---

## Products

### First product: `[:] bebe`

| Field | Value |
|-------|-------|
| displayName | `[:] bebe` |
| description | A little app for remembering your baby's everyday moments. |
| status | **published** (shown as Coming soon) |
| appStoreUrl | empty |
| screenshot | empty (add via admin when ready) |

**Coming soon** = `status: published` + no store links.

### Product card layout

```
┌─────────────────────────────┐
│  [:] bebe                   │
│                             │
│  A little app for           │
│  remembering your baby's    │
│  everyday moments.          │
│                             │
│  [ Coming soon ]            │
└─────────────────────────────┘
```

When live: add `appStoreUrl` / `webUrl`, remove or replace Coming soon badge.

---

## Admin & CMS

### Recommended stack

| Layer | Choice |
|-------|--------|
| Frontend | Next.js (SSG) |
| CMS | Sanity |
| Hosting | Vercel |
| Domain | logusstudio.com |
| Images | Sanity CDN |
| Auth | Google OAuth (owner email only) |

**Why:** 1-page site + admin + images + free tier + easy to extend for bebe landing later.

### Admin URL

- `logusstudio.com/studio` (Sanity Studio)
- `noindex` on `/studio`
- Auth: `logus.naro@gmail.com` only

### What lives in CMS vs code

| CMS (editable) | Code (fixed) |
|----------------|--------------|
| Hero, Philosophy, Studio, Contact copy | Logo blink animation |
| Products (CRUD + publish) | Layout, fonts |
| Social links (CRUD + publish) | Paper texture, coral accent |
| Product screenshots | Section structure |

---

## Products & SNS — Publish Workflow

Both Products and Social Links use the same lifecycle:

```
[ Add ] → [ Draft ] → [ Publish ] ↔ [ Unpublish ] → [ Delete ]
```

### Status definitions

| Status | On site | In admin | Notes |
|--------|---------|----------|-------|
| **draft** | Hidden | Visible | New item, not ready |
| **published** | Visible | Visible | Live on site |
| **unpublished** | Hidden | Visible | Hidden but kept for later |
| **deleted** | Gone | Gone | Permanent removal |

**Unpublish vs delete:**
- **Unpublish** — hide temporarily (pre-launch, pausing SNS, etc.)
- **Delete** — remove permanently (mistakes, retired products)

### Site visibility rules

**Products**
- Only `status === published` items appear
- Sorted by `sortOrder` ascending
- If zero published products → **hide entire Products section**

**Social links**
- Only `status === published` **and** `url` is set
- Sorted by `sortOrder` ascending
- If zero published links → **hide SNS area entirely**
- Contact email always visible

---

## CMS Schema

### SiteSettings (singleton)

```yaml
SiteSettings:
  hero:
    tagline: string       # "Little things. Your story."
    subline: string       # "Independent software studio..."

  philosophy: text        # multiline

  studio: text            # multiline

  contact:
    headline: string
    email: string
```

### Product (collection)

```yaml
Product:
  name: string              # internal slug, e.g. "bebe"
  displayName: string       # "[:] bebe"
  description: text
  sortOrder: number

  status: enum
    - draft
    - published
    - unpublished

  appStoreUrl: url?
  webUrl: url?

  screenshot: image?
  screenshotAlt: string?

  createdAt: datetime
  updatedAt: datetime
```

### SocialLink (collection)

```yaml
SocialLink:
  platform: enum
    - twitter
    - instagram
    - threads
    - youtube
    - other

  label: string?            # for "other" platform
  url: url
  sortOrder: number

  status: enum
    - draft
    - published
    - unpublished

  createdAt: datetime
  updatedAt: datetime
```

### Admin UI actions (Products & SNS)

```
[ + Add ]

List view:
  - Edit
  - Publish      (draft/unpublished → published)
  - Unpublish    (published → unpublished)
  - Delete       (confirm modal, permanent)
```

---

## SEO & Meta

| Field | Value |
|-------|-------|
| Title | logUs Studio — Little things. Your story. |
| Description | Independent software studio building small products that help people remember more. Based in Korea. |
| OG image | Minimal: `logUs[:]` + tagline |

Note: "Logus Studio" may conflict with unrelated businesses in search results. Include **software**, **Korea**, **remember** in meta description.

---

## Launch Phases

### Phase 1 — Launch

- [ ] Hero, Philosophy, Studio, Contact (CMS)
- [ ] `[:] bebe` published as Coming soon
- [ ] Products / SNS publish · unpublish · delete in admin
- [ ] SNS hidden when empty
- [ ] Sanity Studio deployed at `/studio`

### Phase 2 — bebe release

- [ ] Update description, add screenshot via admin
- [ ] Add `appStoreUrl`, update badge to Live or remove Coming soon

### Phase 3 — SNS

- [ ] Add links in admin → Publish

---

## Seed Data

```json
{
  "siteSettings": {
    "hero": {
      "tagline": "Little things. Your story.",
      "subline": "Independent software studio based in Korea."
    },
    "philosophy": "We don't build products\nto make people do more.\n\nWe build products\nthat help people remember more.\n\nLittle things.\nYour story.",
    "studio": "logUs Studio\n\nIndependent software studio.\n\nWe build small products\nfor everyday life.\n\nBased in Korea.",
    "contact": {
      "headline": "Let's build little things together.",
      "email": "logus.naro@gmail.com"
    }
  },
  "products": [
    {
      "name": "bebe",
      "displayName": "[:] bebe",
      "description": "A little app for remembering your baby's everyday moments.",
      "status": "published",
      "sortOrder": 0
    }
  ],
  "socialLinks": []
}
```

---

## Open Questions (non-blocking)

1. **bebe full name on App Store** — `logUs: bebe` vs `[:] bebe` (brand page uses `[:] bebe`)
2. **Coral blink** — match site accent or keep black blink from logo file
3. **Paper texture scope** — Philosophy/Studio only vs subtle site-wide

---

## Local Development — Suggested Next Steps

```bash
# 1. Clone (if not already)
git clone https://github.com/logusnaro/brandpage.git
cd brandpage

# 2. Scaffold
npx create-next-app@latest . --typescript --tailwind --app --src-dir

# 3. Add Sanity
npm install next-sanity @sanity/client @sanity/image-url
npm create sanity@latest -- --project-plan free

# 4. Implement schema from this doc
# 5. Deploy to Vercel, connect logusstudio.com
```

Refer to this document for schema, copy, visual rules, and publish workflow.
