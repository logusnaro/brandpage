# Product 컬렉션 개편 · 2026-10-04

## 범위

- Product만 목록형으로 개편. 홈페이지는 최대 6개 앱, /apps는 전체 공개 앱 목록.
- 카드마다 서비스 logU·앱 이름·한 줄 소개·플랫폼 안내·개별 소개 링크.
- 공개 앱이 적으면 마을 이미지와 브랜드 방향 안내를 표시. 가짜 앱·비공개 프로젝트 자동 공개 없음.
- /apps/[slug]에서 캐릭터·설명·특징·다운로드·앱 화면·영상을 제공. 모바일에서는 설명과 다운로드가 먼저 나옴.
- 가로 소개/가이드 영상은 상세페이지에서 선택하고 세로 홍보 영상은 접힌 영역으로 분리.
- Android / iOS / Web 다운로드를 각각 표시. 준비 중은 비활성 안내, none은 숨김. 기존 링크 데이터 호환.
- CMS에 Google Play URL·플랫폼별 상태·앱 아이콘·목록 소개·특징 설명을 추가. 기존 문서 수정/게시/마이그레이션 없음.
- Intro·Studio·Contact·인증·문의 API·기존 영상은 보존.

## 검증

- npm run lint / npm run build / git diff --check 통과.
- npx sanity schema validate: 오류 0, 경고 0.
- node scripts/test-product-links.mjs: 안전한 HTTPS·세 플랫폼 동시 표시·준비/숨김 상태·레거시 링크·URL 인코딩 통과.
- node scripts/test-app-products.mjs: 앱 1/10개, 홈 6개 제한, 한영 렌더링, 빈 CMS 배열, 영상 그룹, 세 다운로드 링크 통과.
- 회귀 비교: 0c5079a와 Intro/Studio/header 동작 및 Contact 마크업 문자열이 동일함.
- node scripts/test-app-routes.mjs: 홈/목록/상세/영문 200, 없는 앱 404, 관리자 307, 기존 미디어 200.
- 홈페이지 실화면/모바일 화면 캡처: 앞선 사용자 선택(영상·코드 검증만)에 따라 생략.

## 미리보기와 제한

- http://localhost:3001/#product
- http://localhost:3001/apps
- 현재 CMS 앱: DayByBaby 한 개. 스토어 URL 미등록으로 Android/iOS 준비 중 표시.
- 현재 CMS에 실제 앱 스크린샷은 등록되어 있지 않음. 등록하면 갤러리 표시.
- 응급 연락처는 기존 영상에서 시연되지만 실제 앱 진입 확인이 남아 있어 상세페이지에 시연 안내를 표시.
- 신규 비용·패키지 없음. 외부 배포·병합·푸시 없음.
- 로컬 Next start 포트 3001 사용. 파운더 시안 확인 후 수정/배포 승인.

## 네 앱 + 두 예고 자리 · 후속 수정

- 파운더 확정 라인업: DayByBaby, MemoGrip, GoodGo, BookBap. 로컬 기본 카탈로그와 공개 CMS 문서를 병합해 표시.
- 기존 ALLinMEMO 초안의 이름·설명·비공개 내용은 노출하지 않고, 새로 승인된 MemoGrip 기본 소개만 표시. 명시적 unpublished는 존중.
- 네 앱일 때 Coming soon 2개, 다섯 앱일 때 1개, 여섯 개 이상이면 예고 자리 없음. 예고 자리는 클릭 불가.
- 플랫폼 배열에서 Android/iOS/앱인토스/웹의 상태·URL·한영 제공 범위/일정을 각각 관리. 기존 URL 필드 호환.
- 2026-10-04 파운더 결정: 네 앱 모두 Android 2026년 출시 예정, iOS 2027년 초 목표. 현재는 준비 상태로 표시하며 출시 링크를 임의 생성하지 않음.
- 앱인토스는 일부 기능을 분리한 미니앱임을 공통 안내. 네 앱 전부가 토스에서 이용 가능하다고 표시하지 않음. 앱별 제공 기능은 확정 후 플랫폼 noteI18n에 입력.
- node scripts/test-launch-catalogue.mjs: 4개 브랜드명, CMS 초안 비노출·명시적 비공개·추가 앱·링크 미조작 통과.
- 기존 링크/렌더/회귀/HTTP 테스트에 복수 플랫폼, 앱인토스, 4+2·5+1·10앱, 네 앱 상세 경로 확인 추가; 통과.
- npm run build/lint 및 Sanity schema validate 통과. Intro·Contact 변경 없음. 외부 배포·CMS 게시 없음.
