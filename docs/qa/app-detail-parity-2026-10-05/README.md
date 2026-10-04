# DayByBaby approved-design correction — 2026-10-05

Baseline: 17d0ea0. Earlier functional QA did not establish visual parity.
References: ../../designs/app-detail-concepts-2026-10-04/04-pc-first-screen.png and 05-pc-video-features-v2.png.

## Changes
- Reduced desktop hero height and mascot scale.
- Video section follows 26:74 columns, wide 2.85:1 poster; playback remains 16:9.
- Removed repeated video-frame feature illustrations. Small thumbnails sit beside text.
- Restored teal headings, coral controls and Language menu.
- Emergency contacts are presented as an essential feature: family calling and emergency alerts. Source: bebe_v3/DESIGN_SYSTEM.md, emergency-alert specification. No real emergency call was made in this website QA.
- Homepage/catalogue and unrelated OperationsDashboard edits were preserved.
- Artwork is illustrative, not an actual app screenshot.

## Verification
Lint, production build, product regression assertions and route checks passed.
Browser checks cover four apps at 1440×1000, 393×852, 320×740 and 820×1180; image decoding, overflow, Language selection, three video choices, portrait links and related-app navigation.
Proportion assertions cover hero height, small mascot, thumbnail size and wide poster.
No remote deployment. Final visual approval remains with the founder; automated checks do not claim pixel-perfect equivalence.

See generated PNG captures in this directory.
Local preview: http://localhost:3001/apps/bebe?lang=ko
