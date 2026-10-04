# 앱 상세 · 승인된 1번 마을 공간형 구현 검증

상태: verified (로컬). 작업 등급 S2 / 변경 위험도 L2. 세이브 포인트 `573c12a`. 외부 배포·푸시·병합·Sanity 콘텐츠 게시 없음.

## 변경

- DayByBaby: 푸리의 육아 공간과 밝은 문구 영역, 플랫폼 준비 표시 → 선택형 영상 → 3개 특징 → 다운로드 → 작은 이웃 앱 영역.
- MemoGrip / GoodGo / BookBap: 동일한 상세 페이지 구조, 기존 승인 캐릭터 그림과 각 앱 README·명세에 근거한 문구. 미제작 영상은 노출하지 않음.
- 등록된 실제 HTTPS 링크만 활성화. Android/iOS/앱인토스/웹의 개별 상태·제공 범위는 기존 데이터 구조 재사용. 미출시 링크는 클릭할 수 없음.
- Sanity Product에 선택형 상세 문구/배경 필드, 기존 서비스 특징에 이미지 필드 추가. 기존 데이터는 이동·수정하지 않음. 비워둔 문구는 기본 내용, 명시적으로 비운 영상/특징 목록은 숨김.
- 홈페이지 Intro/Studio/Product/Contact 및 목록 CSS는 HEAD와 동일. 다른 작업의 `OperationsDashboard.tsx` 수정 보존.
- 기존 재생·안전한 링크 판별 재사용, 새로운 패키지 없음. 이미지 제작 스킬은 승인된 시안에서 UI를 뺀 두 배경에만 사용.

## 검증

- `npm run lint`: 통과.
- `npm run build`: Next 16.3.4 production 빌드·TypeScript 통과.
- `npx sanity schema validate`: 오류 0 / 경고 0.
- `node scripts/test-app-products.mjs`: 목록 4+2·확장·상세 영상 그룹·한국어/영어·CMS 덮어쓰기·빈 목록·홈페이지 회귀 통과.
- `node scripts/test-product-links.mjs`, `node scripts/test-launch-catalogue.mjs`: URL/플랫폼/공개 상태/향후 앱 통과.
- `node scripts/test-app-routes.mjs`: 홈페이지·목록·네 앱 상세·영문 200, 없는 앱 404, 관리자 비로그인 307, 기존 이미지/영상 200.
- `node scripts/test-app-detail-browser.mjs`: 설치된 Microsoft Edge로 네 앱을 1440×1000 / 393×852 / 320×740 / 820×1180에서 확인. 가로 넘침 없음, 모바일 이미지와 문구 분리, 헤더 침범 없음, 이미지 디코딩 성공. 영어·영상 3개 선택/실제 미디어 로드·세로 영상 링크 2개·이웃 이동·홈페이지 및 목록 유지, 브라우저 오류 0.
- 위 캡처 12장 직접 확인. 신규 하루 현황 이미지는 서버 재시작 전에 추가돼 첫 검사에서 404였으나 재시작 후 재검증 통과. 배경이 문구 뒤로 지나가던 부분은 밝은 왼쪽 그라데이션으로 교정하고 재검증.
- `git diff --check`: 통과 (Windows 줄바꿈 변환 안내만).

자동화 전용 `agent-browser`가 설치되지 않아 이미 설치된 Playwright와 시스템 Edge를 사용했다. 새 브라우저 다운로드 없음.

## 실제 캡처

- [PC 첫 화면](bebe-pc-hero.png) / [PC 영상](bebe-pc-videos.png) / [PC 기능·이웃](bebe-pc-features.png)
- [모바일 첫 화면](bebe-mobile-hero.png) / [모바일 영상](bebe-mobile-videos.png) / [모바일 기능](bebe-mobile-features.png)
- 나머지 앱: `memogrip-`, `goodgo-`, `bookbap-`의 `pc-hero.png`와 `mobile-hero.png`.

이는 로컬 실제 브라우저 캡처이며 생성 시안이 아니다. 모바일은 viewport 모사이며 물리 S26 검사는 아니다. 실제 스토어 다운로드·관리자 로그인 후 CMS 필드 저장·원격 실사이트는 미검증/미변경. 응급 연락처는 영상의 시연 기능 안내를 유지했다.

## 판정·다음

승인된 상세 UI 구현의 관련 검증 통과. 병합 가능(파운더 승인 대기). 로컬 `/apps/bebe?lang=ko`에서 검토 후 별도 승인 시 배포. 온라인 `test.logusstudio.com`은 아직 갱신하지 않았다.
