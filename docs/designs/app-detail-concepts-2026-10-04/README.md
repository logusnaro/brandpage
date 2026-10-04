# 앱 상세페이지 디자인 시안 3종

상태: 비교용 이미지 시안. 홈페이지 코드·CMS·외부 배포 변경 없음. 내장 image_gen 사용.

- [01 마을 속 서비스 공간형](01-village-service-room.png)
- [02 실제 앱 화면 중심형](02-product-editorial.png)
- [03 영상 중심형](03-cinematic-guide.png)

세 이미지의 구성·푸리 정체성·플랫폼 준비 표시·영상 선택 영역을 직접 이미지 확인했다. 시안에 나타난 휴대폰과 기록 UI는 생성된 예시이며 최종 실제 앱과 같다고 주장하지 않는다. 실제 구현에서는 기존 영상/앱 촬영본, 정확한 앱별 카피, 실제 스토어 링크 데이터로 교체해야 한다.

## 확인한 앱 원본

| 서비스 | 로컬 기준 | 소개에 강조할 핵심 | 아직 약속하지 않을 내용 |
|---|---|---|---|
| DayByBaby | ../bebe_v3/README.md, V3_DEV_SPEC.md, V3_RELEASE_STATUS.md 및 브랜드페이지 기존 푸리 영상 | 간편 기록, 하루 확인, 함께 간직하는 육아 기록 | 응급 연락은 기존 영상 시연과 출시 기능 확인을 구분; 승인 전 정식 출시/다운로드로 표시하지 않음 |
| MemoGrip | ../memo/README.md | 먼저 자유롭게 입력, 규칙·AI 분류, PC·Android 같은 계정 동기화 | 미확정 iOS/추가 플랫폼 제공 기능 |
| GoodGo | ../readygo/README.md, docs/01_PRODUCT_PRD.md | 준비·출발 시각 역산, 외출 준비물, 날씨·이동시간 | 자체 내비게이션/자동 출발 판정/확인되지 않은 백그라운드 알림 |
| BookBap | ../innerbrary/README.md, docs/00-project-hub.md | 책과 문장 기록, 독서 자산, 다시 꺼내보기 | 현재 구현과 미래 OCR/사진 백업 계획을 동일하게 출시 기능으로 표시하지 않음 |

앱 대화창도 이름으로 확인: `[:] DayByBaby(bebe_v3)`, `[:] Memogrip(AllinMEMO)_260824`, `[:] GOODgo(ReadyGo)`, `[:] BookBap(innerbrary)_1st`. 대화 요약만으로 기능 출시를 단정하지 않고 저장소 최신 기준과 교차 확인.

## 현재 상세 구성의 아쉬움 — 코드와 기존 자료 기준

- 큰 캐릭터 컷 + 이름 + 짧은 설명 조합이 제품의 실제 효용보다 앞에 있음.
- DayByBaby 외 앱의 기능 설명/영상 데이터가 빈약해 상세페이지가 이미지·문구 수준에 머물 수 있음.
- 기능은 작은 텍스트 3칸이고 실제 입력/확인 경험을 보여주는 시각적 근거가 부족함.
- 기존 푸리 영상이 아래에 분리되어 앱 소개 흐름과 결합이 약함.
- 출시 예정은 표시되지만 실제 출시 후 활성화할 스토어 영역을 더 명확히 설계할 필요가 있음.
- 현재 웹페이지를 새로 캡처해 검수한 것은 아님. 위 평가는 구현 구조와 이미 보존된 이미지·영상 포스터 기준.

## 공식 레퍼런스와 차용 범위

- [Finch](https://finchcare.com/): 동반 캐릭터를 서비스의 정서적 입구로 사용. logU는 장식 이미지가 아니라 앱의 도움을 전달하는 안내자로 활용한다는 디자인 제안. 평점·후기는 차용하지 않음.
- [Bear](https://bear.app/): 제품 이름/플랫폼을 먼저 밝히고 영상·화면과 기능별 이점을 연결. 차용: 앱 사용 장면으로 효용을 증명하는 설명 흐름.
- [Huckleberry](https://explore.huckleberrycare.com/app/): 육아 부담을 줄이는 가치 → 기록/요약 기능 → 플랫폼/다운로드 안내. 차용: 기능 나열 대신 사용자의 상황과 효용을 짝지음. 의료적/통계적 주장·외부 브랜드 자산은 차용하지 않음.

## 공통 설계

비교를 위해 세 시안 모두 DayByBaby와 푸리를 사용. 세 개의 다른 앱 시안이 아니라 같은 앱 상세페이지의 세 방향이다.

- 앱명 → 사용자가 얻는 가치 → 서비스 logU와 사용 장면 → 플랫폼 → 영상/핵심 사용 흐름 → 다른 앱.
- Android/iOS/앱인토스/웹은 앱별 데이터에 따라 독립 노출. 현재 Android/iOS는 준비 상태, 실제 URL 확인 후 버튼 활성화. 앱인토스는 일부 기능 미니앱을 별도 안내하며 전 앱 출시로 표시하지 않음.
- 영상은 기존 짧은 소개 20초/기능 가이드 35초/소개+가이드 90초 재사용. 세로 소개/가이드는 보조 선택으로 분리. 자동재생·소리 강요 없음.
- 모든 앱 공통 골격을 유지하되 앱의 색/캐릭터/실제 화면/카피/영상은 별도 데이터. 없는 영상을 억지로 빈 플레이어로 만들지 않음.
- 모바일 구현 시 내용→스토어→사용장면→선택재생 영상 순서. 데스크톱 시안은 모바일 구현 완료의 근거가 아님.
- 생성된 시안의 휴대폰 UI와 한글은 레이아웃 참고이며 최종 구현에서 실제 화면·웹 텍스트로 교체. 생성 이미지가 실서비스 캡처인 것처럼 사용하지 않음.

## 세 방향

1. **마을 속 서비스 공간형 (추천)** — 목록의 logU 마을에서 앱의 생활 공간으로 들어간 느낌. 푸리·앱 화면·영상이 따뜻한 하나의 서비스 이야기로 이어짐.
2. **실제 앱 화면 중심형** — 사용법과 효용을 빠르게 이해시키는 구조. 캐릭터는 보조, 실제 UI와 3단계 사용 흐름이 중심.
3. **영상 중심형** — 깊은 숲색 영화 포스터와 선택 재생으로 제작한 영상의 매력을 살림. 바로 다음 밝은 영역에 플랫폼/다운로드를 배치해 탐색을 막지 않음.

## 생성 프롬프트

### 01-village-service-room

Use case: ui-mockup. Create ONE exceptionally polished high-fidelity Korean desktop APP DETAIL website concept for logUs Studio's DayByBaby, not an apps directory and not a collage of design options. Show a complete designed upper landing page plus its next 2 content sections, a coherent long-page screenshot, around 1440x1800 portrait. No outer browser frame, no perspective screen mockup. Sharp refined Pretendard-like typography, generous editorial spacing, professionally art-directed charming tactile logU universe yet functional software marketing. Input1 is exact Ppuri character identity: white rounded pebble body, glossy black eyes, peach bib with bear pocket, bottle, two coral belly buttons, grey feet. Input2 is EXISTING DayByBaby feature guide video thumbnail with actual app form; reuse it accurately inside video area as a thumbnail. Input3 is the approved Apps directory visual language only; do NOT recreate the directory or six-app grid. All are references, not targets to edit. Common header logUs Studio / Studio Apps Contact / Language, breadcrumb 'Apps / DayByBaby'. Product name exactly 'DayByBaby'. Main Korean benefit headline '기록은 가볍게.\n아기의 하루는 오래도록.' Supporting line '아이의 하루를 기록하고, 함께 자라는 순간을 간직해요.' Include practical platform area with Google Play 'Android · 출시 예정', App Store 'iOS · 준비 중' BOTH muted outlined non-active future-download placeholders, and text '출시 후 다운로드 링크가 열립니다.' These reserved placements must clearly show stores can become active later. No false released/download now status, no fabricated app-store reviews, ratings, pricing or clinical claims. Video selector exact labels '짧은 소개 0:20', '기능 가이드 0:35', '소개 + 가이드 1:30', short introduction initially selected; thumbnail Ppuri and baby journal theme with restrained play button. Real benefits only '간편 입력', '하루를 한눈에', '함께 남기는 기록'. Main information layout must fit other apps by replacing art, texts, platform badges and videos. Label tiny footer '디자인 시안 · 앱 화면은 예시'. No garbled long paragraphs; limit readable concise Korean text. End with subtle '다른 logU도 만나보세요' plus SMALL neighboring app names MemoGrip / GoodGo / BookBap, not oversized directory cards. Constraints: no existing homepage changes, no fake screenshot claims, no giant generic dashboard cards or sales stats.
DESIGN 01 — A ROOM IN THE logU VILLAGE (recommended). Warm ivory #f3f0e8, ink forest #253b31, peach/coral #d9785d. Header cream. A left copy/right immersive nursery hero in an elegantly flat full-width peach warm strip, avoiding isolated avatar-on-colored-box. Art begins inside a sunlit rounded stone cottage with arched window revealing village hills, tiny crib, playful but exquisite Ppuri waving bottle; one phone with a simplified crop of guide app input form from input2 as an illustrative UI preview, grounded in scene not floating all over. Large quiet title, massive benefit lines left, platform placeholders directly below left; clear lean product identity not children's toy store. Hero about 520px tall. Below hero an editorial two-column VIDEO SECTION: small intro left '푸리와 먼저 만나보세요.' then large landscape existing video thumbnail right, selectors beneath. Below three compact horizontal benefit stories using cropped example form screenshot for quick logging, understated day timeline visual for overview, tiny Ppuri/family memory illustration for records. Warm vignettes, clean no excessive rounded panels. Rhythm and polished branded continuity with directory. All sections readable, show enough page belowfold to judge hierarchy.

### 02-product-editorial

Use case: ui-mockup. Create ONE exceptionally polished high-fidelity Korean desktop APP DETAIL website concept for logUs Studio's DayByBaby, not an apps directory and not a collage of design options. Show a complete designed upper landing page plus its next 2 content sections, a coherent long-page screenshot, around 1440x1800 portrait. No outer browser frame, no perspective screen mockup. Sharp refined Pretendard-like typography, generous editorial spacing, professionally art-directed charming tactile logU universe yet functional software marketing. Input1 is exact Ppuri character identity: white rounded pebble body, glossy black eyes, peach bib with bear pocket, bottle, two coral belly buttons, grey feet. Input2 is EXISTING DayByBaby feature guide video thumbnail with actual app form; reuse it accurately inside video area as a thumbnail. Input3 is the approved Apps directory visual language only; do NOT recreate the directory or six-app grid. All are references, not targets to edit. Common header logUs Studio / Studio Apps Contact / Language, breadcrumb 'Apps / DayByBaby'. Product name exactly 'DayByBaby'. Main Korean benefit headline '기록은 가볍게.\n아기의 하루는 오래도록.' Supporting line '아이의 하루를 기록하고, 함께 자라는 순간을 간직해요.' Include practical platform area with Google Play 'Android · 출시 예정', App Store 'iOS · 준비 중' BOTH muted outlined non-active future-download placeholders, and text '출시 후 다운로드 링크가 열립니다.' These reserved placements must clearly show stores can become active later. No false released/download now status, no fabricated app-store reviews, ratings, pricing or clinical claims. Video selector exact labels '짧은 소개 0:20', '기능 가이드 0:35', '소개 + 가이드 1:30', short introduction initially selected; thumbnail Ppuri and baby journal theme with restrained play button. Real benefits only '간편 입력', '하루를 한눈에', '함께 남기는 기록'. Main information layout must fit other apps by replacing art, texts, platform badges and videos. Label tiny footer '디자인 시안 · 앱 화면은 예시'. No garbled long paragraphs; limit readable concise Korean text. End with subtle '다른 logU도 만나보세요' plus SMALL neighboring app names MemoGrip / GoodGo / BookBap, not oversized directory cards. Constraints: no existing homepage changes, no fake screenshot claims, no giant generic dashboard cards or sales stats.
DESIGN 02 — SOFTWARE FIRST EDITORIAL. Light neutral ivory, graphite/forest type, coral one accent. Intentionally DIFFERENT from option1: no nursery/village panorama hero. Crisp print-like editorial layout with oversized DayByBaby wordmark at upper left and main benefit below; RIGHT hero cluster of TWO large elegant Android phone frames with simplified but coherent baby journal UI (current record form from input2 and daily summary), screen has realistic restrained fields not gibberish. Small Ppuri leaning beside lower phone; character supports PRODUCT rather than dominating. Platform download placeholders neatly aligned horizontal beneath left copy. Thin rule then an unusually clear numbered 3-step walkthrough: 01 '간편하게 남기고', 02 '하루를 확인하고', 03 '함께 간직해요', each with a LARGE UI crop framed by whitespace and brief text, no chunky pastel SaaS cards. Lower full-width premium video panel with guide thumbnail selectors and caption. A refined mature app product website with tactile mascot warmth, very large lettering and asymmetrical screen composition, robust alignment, not generic template. More actual UI visibility than character art.

### 03-cinematic-guide

Use case: ui-mockup. Create ONE exceptionally polished high-fidelity Korean desktop APP DETAIL website concept for logUs Studio's DayByBaby, not an apps directory and not a collage of design options. Show a complete designed upper landing page plus its next 2 content sections, a coherent long-page screenshot, around 1440x1800 portrait. No outer browser frame, no perspective screen mockup. Sharp refined Pretendard-like typography, generous editorial spacing, professionally art-directed charming tactile logU universe yet functional software marketing. Input1 is exact Ppuri character identity: white rounded pebble body, glossy black eyes, peach bib with bear pocket, bottle, two coral belly buttons, grey feet. Input2 is EXISTING DayByBaby feature guide video thumbnail with actual app form; reuse it accurately inside video area as a thumbnail. Input3 is the approved Apps directory visual language only; do NOT recreate the directory or six-app grid. All are references, not targets to edit. Common header logUs Studio / Studio Apps Contact / Language, breadcrumb 'Apps / DayByBaby'. Product name exactly 'DayByBaby'. Main Korean benefit headline '기록은 가볍게.\n아기의 하루는 오래도록.' Supporting line '아이의 하루를 기록하고, 함께 자라는 순간을 간직해요.' Include practical platform area with Google Play 'Android · 출시 예정', App Store 'iOS · 준비 중' BOTH muted outlined non-active future-download placeholders, and text '출시 후 다운로드 링크가 열립니다.' These reserved placements must clearly show stores can become active later. No false released/download now status, no fabricated app-store reviews, ratings, pricing or clinical claims. Video selector exact labels '짧은 소개 0:20', '기능 가이드 0:35', '소개 + 가이드 1:30', short introduction initially selected; thumbnail Ppuri and baby journal theme with restrained play button. Real benefits only '간편 입력', '하루를 한눈에', '함께 남기는 기록'. Main information layout must fit other apps by replacing art, texts, platform badges and videos. Label tiny footer '디자인 시안 · 앱 화면은 예시'. No garbled long paragraphs; limit readable concise Korean text. End with subtle '다른 logU도 만나보세요' plus SMALL neighboring app names MemoGrip / GoodGo / BookBap, not oversized directory cards. Constraints: no existing homepage changes, no fake screenshot claims, no giant generic dashboard cards or sales stats.
DESIGN 03 — CINEMATIC SERVICE FILM. Intentionally DIFFERENT: deep forest #20382f top, warm cream typography, muted coral. Full-width dark cinematic hero with large 16:9 VIDEO POSTER central/right containing warm Ppuri nursery scene, thin play-circle; left editorial rail with DayByBaby and Korean benefit, horizontal compact video selectors '짧은 소개 0:20 / 기능 가이드 0:35 / 소개 + 가이드 1:30' below hero. Hero is website with clearly user-initiated video play, not full background autoplay or empty blackscreen. Maintain readability, cinematic poster not overwhelming typography. A HIGH-CONTRAST IVORY horizontal PLATFORM STRIP immediately below movie, with Android/iOS planned-store slots and explanatory status, clearly the next action. Below cream section '작은 기록이 하루를 연결합니다.' uses large alternating left/right actual UI form crop from input2 and sparse feature explanation; 3 quiet labelled benefits. One SMALL strip '푸리의 사용 가이드' lower showing existing video thumbnail not redundant giant second full player. Premium independent production / product launch feel with film and real usage equally strong; dark-to-cream transition intentional. No copied Apple branding or phone giant spreading across several sections.

