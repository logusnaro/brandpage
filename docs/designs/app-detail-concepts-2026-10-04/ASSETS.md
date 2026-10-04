# 승인 시안의 실제 웹 자산

2026-10-05. 이미지 제작 도구로 시안에서 글자·버튼·내비게이션을 제거한 배경을 만들었다. UI는 React 요소로 구현하며 이미지에 구워 넣지 않는다. 원본 PNG는 Codex 생성 폴더에 그대로 보존하고 WebP만 홈페이지에 추가했다.

- `public/apps-art/daybybaby-room-v1.webp`: 승인 `04-pc-first-screen.png`의 푸리 육아 공간. 원본 `C:/Users/jkhon/.codex/generated_images/01a02efd-8933-7fb1-8295-35c1cad10105/exec-78cbb08f-f821-4b5d-a71b-fbfb7d41da7c.png`.
- `public/apps-art/daybybaby-memories-v1.webp`: 승인 `01-village-service-room.png`의 기억을 간직하는 장면. 원본 `C:/Users/jkhon/.codex/generated_images/01a02efd-8933-7fb1-8295-35c1cad10105/exec-072c7bc2-6c7c-41c2-9ec9-07f54fa48f51.png`.
- `public/films/daybybaby-day.webp`: 기존 `daybybaby-ppuri-guide-35s.mp4` 18초 프레임에서 추출. 실제 개발 중인 앱 화면과 가상의 예시 데이터. 신규 가짜 UI를 생성하지 않았다.
- 나머지 앱은 기존 `public/apps-art/{memogrip,goodgo,bookbap}-v1.webp` 재사용. 설명용 그림이지 실제 앱 스크린샷이 아니다.

## 생성 프롬프트

### 방

Extract ONLY the approved PC concept's clean full-width HERO illustration as a website background, not a mockup. Preserve nursery composition, Ppuri face/body/bottle/peach bib/two coral dots/grey feet, arched window onto logU village, crib, plush bear, rubber duck and wooden toys, tactile clay lighting. Wide 2.6:1 composition. Ppuri around70% horizontal and70% vertical, feet visible; arch window behind right, crib far right. Left45% seamless light ivory negative space #fbf8f2 for live website text. REMOVE ALL text, icon, logo, navbar, breadcrumb, headings, buttons, platform logos, controls and belowfold video. No phones/screens, new style or new character. Clean illustration only, no baked-in UI.

### 기억

Extract the lower RIGHT warm keepsake illustration from the approved long webpage, expand into standalone16:10 artwork. Exact white baby pebble Ppuri with peach bib/two coral buttons, beside a little family pebble friend, holding an open memory scrapbook with stylized family pebble drawing, warm stone cottage and arched window onto softly blurred logU village. No human photographs, humans, text, labels, UI, phone, buttons or heart icons. Match tactile clay/craft materials and peach/coral/ivory lighting. Naturally candid offcenter arrangement. Asset only, no website.
