# Pre-dev Approvals (locked 2026-07-14)

Answers from founder. Local development must follow these.

---

## Q&A

### 0. SNS
- **Threads:** https://www.threads.com/@logus.naro  
- Seed as published SocialLink (`platform: threads`).

### 1. Sanity
- **Yes, use Sanity.**
- Signup: done.
- **Project name:** `logusstudio`
- **Project ID:** `7wq3nq5m`
- Dataset: `production` (default; confirm at scaffold time)
- Mount admin at `/admin`.
- Full schema/Studio setup = during local Phase 1 scaffolding (not required now).

### 2. Stack
- **Next.js + Tailwind + TypeScript + Vercel** — approved.

### 3. Admin URL
- **`logusstudio.com/admin`** (not `/studio`).

### 4. Admin login
- **Single account only** (`logus.naro@gmail.com`).
- **Can change later:** yes — add/remove users or switch provider in Sanity project settings / access control. Not locked forever.

### 5. `:` blink
- **Same as logo** — black `#111111`, not coral.

### 6. Color
- **Black & white only** (no coral accent).

### 7. Paper texture
- Follow recommendation (Philosophy / Studio only), review after first visual build.
- *What it is:* very subtle grain/noise so sections feel like paper, not flat plastic white. Easy to remove if disliked.

### 8. Logo / font
- No existing logo file — generate with **Inter SemiBold**, `#111111`, tight tracking (~-4%).
- Product naming on site: `logUs: bebe` / short `[:]bebe` or `[:] bebe` as designed.
- Assets in `assets/brand/`.

### 9. v1 scope = Phase 1 only
See phases below. Phase 2–3 after launch.

### 10. Accounts already owned
- Vercel ✅  
- Cloudflare ✅ (DNS for logusstudio.com)  
- Sanity ❌ — create free account when scaffolding

### 11. App Store name
- Prefer **`[:]bebe`** (shorter than “로그어스베베” / long `logUs: bebe`).

### 12. Font
- **Inter SemiBold** for logo & primary UI type (matches item 8 / 15 brief).

### 13. OG = Open Graph image
Image shown when the link is shared (iMessage, Threads, Kakao, Slack preview).  
v1: minimal PNG — symbol or wordmark + tagline. Generated later at deploy if needed.

### 14–15. Brand naming & logo brief
See `docs/PLANNING.md` Brand Identity and `assets/brand/`.

---

## Launch phases (how many?)

| Phase | Name | When |
|-------|------|------|
| **1** | Site launch | **= v1 / 오늘 개발 범위** |
| **2** | bebe store live | App ready → screenshot + App Store link |
| **3** | Extra polish | More SNS, OG polish, etc. |

**v1 = Phase 1 only.** Threads already exists → include in Phase 1 seed (published).

### Phase 1 checklist
- [ ] Single-page UI (B&W, Inter)
- [ ] Sanity CMS + `/admin`
- [ ] Single-user admin access
- [ ] `[:]bebe` / `logUs: bebe` Coming soon product
- [ ] Threads link published
- [ ] Deploy Vercel + Cloudflare DNS for logusstudio.com
