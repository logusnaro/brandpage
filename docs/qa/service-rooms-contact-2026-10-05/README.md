# Service rooms and Contact QA — 2026-10-05

Baseline bbe78d2. Founder approved extending DayByBaby design and explicitly chose PC/mobile visual verification.
Scope: three app detail rooms, shared detail styling, Contact image + alt text only.
Unrelated OperationsDashboard edits excluded.

PASS:
- ESLint, production build, TypeScript.
- Product SSR regression: four apps / 4+2 catalogue / platform links / empty and custom CMS content; no player for missing videos; three distinct feature images; Contact form/layout unchanged.
- Edge via existing Playwright (agent-browser CLI unavailable): four apps × 1440×1000,393×852,320×740,820×1180. No overlap or horizontal overflow; imagery decoded; DayByBaby three videos and portrait links, Language navigation and neighbor links preserved. Browser errors 0.
- Contact: new portrait image decodes, form retained, no horizontal overflow at all four sizes.
- HTTP home/list/detail/English200, unknown app404, admin307, existing media200.
- Twenty PC/mobile captures saved here; reviewed all three hero compositions, feature rows and Contact PC/mobile crop.

No website deployment, CMS write, push or merge. No physical phone, real store-download or real inquiry submission test.
Existing video/music files are untouched; new app videos deferred.
Assets are illustrative, not actual screenshots. See ../../designs/service-rooms-contact-2026-10-05.md for full prompts and sources.
