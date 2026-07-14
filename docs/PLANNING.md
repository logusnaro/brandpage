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
| Company name | logUs Studio (로그어스스튜디오) |
| Homepage name | logUs Studio |
| Logo (wordmark) | logUs Studio |
| Symbol | `[:]` |
| Service naming (full) | `logUs: OOO` |
| Service naming (short) | `[:]OOO` / `[:] OOO` |
| App Store (bebe) | `[:]bebe` |
| Domain | logusstudio.com |
| Contact | logus.naro@gmail.com |
| Threads | https://www.threads.com/@logus.naro |
| Location | Based in Korea |
| Logo assets | `assets/brand/` |

### Decisions (locked)

| Item | Decision |
|------|----------|
| Language | English only (v1) |
| Personal name | Not shown on site |
| Tone | Calm, warm, slightly premium — not productivity/SaaS startup |
| Color | Black & white only (`#111111` / white) — no coral |
| Type | Inter SemiBold (logo + UI), tracking slightly tight |
| `:` blink | Black, same as logo |
| Admin URL | `/admin` |
| Admin auth | Single account (`logus.naro@gmail.com`); changeable later |
| CMS | Sanity |
| Stack | Next.js + Tailwind + Vercel |
| DNS | Cloudflare → Vercel |
| SNS | Threads published at launch; admin supports add/publish/unpublish/delete |
| v1 scope | **Phase 1 only** — see Approvals |

Full approval transcript: [`docs/APPROVALS.md`](./APPROVALS.md)

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

### Core principle: black & white + Inter

| Element | Spec |
|---------|------|
| Background | White or very light warm white (`#FFFFFF` / `#FAFAF8`) |
| Text / logo | `#111111` |
| Wordmark | `logUs Studio` (Inter SemiBold, tracking ~-4%) |
| Symbol | `[:]` — reusable as favicon; `:` blink in black |
| Accent | None (B&W only). Hover = underline / opacity |
| Texture | Subtle paper grain on Philosophy / Studio only — review after first build |

### Paper texture (simple explanation)

A barely visible grain so those sections feel like paper instead of pure plastic white. If it looks noisy, remove it.

### Typography

- **Logo / UI headings:** Inter SemiBold
- **Body / philosophy:** Inter Regular/Medium, generous line-height
- Load via `next/font/google` (Inter)

---

## Page Structure

Single-page scroll. Five sections.

```
┌──────────────────────────────────────────┐
│  HERO                                    │
│  logUs Studio  +  [:] (: blink, black)   │
│  Little things. Your story.        [CMS] │
│  Independent software studio...    [CMS] │
├──────────────────────────────────────────┤
│  PHILOSOPHY  [paper texture]       [CMS] │
├──────────────────────────────────────────┤
│  STUDIO      [paper texture]       [CMS] │
├──────────────────────────────────────────┤
│  PRODUCTS  (published only; hidden if 0) │
│  ┌────────────────┐                      │
│  │ [:]bebe        │  Coming soon   [CMS] │
│  │ one-liner      │                      │
│  └────────────────┘                      │
├──────────────────────────────────────────┤
│  CONTACT                           [CMS] │
│  Let's build little things together.     │
│  logus.naro@gmail.com                    │
│  [Threads — published]                   │
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

### First product: `[:]bebe`

| Field | Value |
|-------|-------|
| displayName | `[:]bebe` (site short) / `logUs: bebe` (full where needed) |
| description | A little app for remembering your baby's everyday moments. |
| status | **published** (shown as Coming soon) |
| App Store name (planned) | `[:]bebe` |
| appStoreUrl | empty |
| screenshot | empty (add via admin when ready) |

**Coming soon** = `status: published` + no store links.

### Product card layout

```
┌─────────────────────────────┐
│  [:]bebe                    │
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
| Auth | Single user (`logus.naro@gmail.com`) — changeable later |
| DNS | Cloudflare → Vercel |

**Why:** 1-page site + admin + images + free tier + easy to extend for bebe landing later.

**Sanity signup:** Free account required once (`sanity.io` → create project → connect to this repo). Admin UI embeds at `/admin`.

### Admin URL

- `logusstudio.com/admin` (Sanity Studio embedded)
- `noindex` on `/admin`
- Auth: single account only

### What lives in CMS vs code

| CMS (editable) | Code (fixed) |
|----------------|--------------|
| Hero, Philosophy, Studio, Contact copy | Logo blink animation |
| Products (CRUD + publish) | Layout, Inter font |
| Social links (CRUD + publish) | Paper texture (review later) |
| Product screenshots | Section structure, B&W theme |

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
| OG image | Open Graph preview image when links are shared — minimal wordmark/symbol + tagline (Phase 1 deploy) |

Note: "Logus Studio" may conflict with unrelated businesses in search results. Include **software**, **Korea**, **remember** in meta description.

---

## Launch Phases

There are **3 phases**. **v1 development = Phase 1 only.**

### Phase 1 — Launch (= v1)

- [ ] Hero, Philosophy, Studio, Contact (CMS)
- [ ] `[:]bebe` published as Coming soon
- [ ] Products / SNS publish · unpublish · delete in admin
- [ ] Threads published
- [ ] Sanity embedded at `/admin`
- [ ] Deploy Vercel + Cloudflare DNS

### Phase 2 — bebe release

- [ ] Update description, add screenshot via admin
- [ ] Add `appStoreUrl`, update badge to Live or remove Coming soon

### Phase 3 — Extra polish

- [ ] More SNS if needed
- [ ] OG / favicon polish
- [ ] Paper texture keep/remove decision

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
      "displayName": "[:]bebe",
      "description": "A little app for remembering your baby's everyday moments.",
      "status": "published",
      "sortOrder": 0
    }
  ],
  "socialLinks": [
    {
      "platform": "threads",
      "url": "https://www.threads.com/@logus.naro",
      "status": "published",
      "sortOrder": 0
    }
  ]
}
```

---

## Local Development — Suggested Next Steps

See also [`docs/LOCAL_SETUP.md`](./LOCAL_SETUP.md) and [`docs/APPROVALS.md`](./APPROVALS.md).

```bash
# 1. Clone (if not already)
git clone https://github.com/logusnaro/brandpage.git
cd brandpage
git checkout cursor/brand-page-planning-8071

# 2. Scaffold (keep docs/ + assets/)
npx create-next-app@latest . --typescript --tailwind --app --src-dir

# 3. Add Sanity (needs free signup)
npm install next-sanity @sanity/client @sanity/image-url sanity
# create Sanity project, mount Studio at /admin

# 4. Implement schema + UI from this doc
# 5. Deploy to Vercel, point Cloudflare DNS for logusstudio.com
```

Refer to this document for schema, copy, visual rules, and publish workflow.
