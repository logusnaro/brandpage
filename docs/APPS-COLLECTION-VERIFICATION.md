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
