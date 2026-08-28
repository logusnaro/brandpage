# logUs Studio 홈페이지 작업 일지

## 2026-08-27 — HTML_V6 기준 복구 및 비공개 Preview 배포

### 요청 사항

- 기준 파일: Google Drive `HTML_V6` (`stitch-test-v6.html`)
- Intro, Product, Contact, Footer의 표현을 HTML_V6 기준으로 복구
- 현재 배경·코랄·Product 배색과 기존 이미지는 유지
- 키보드 좌우 화살표 전환 제거
- 이미지 위 설명·버튼 제거
- Language 선택과 우측 인디케이터를 HTML_V6 방식으로 적용
- Contact 문의 폼과 Footer 복구
- 주소는 Footer에서 제외
- Product 문의 표현은 기존 요청에 따라 `서비스 문의`로 사용

### 확인된 문제

1. Next.js가 `next/font/google`의 Inter를 별도로 불러와 HTML_V6와 실제 글꼴이 달랐음.
2. HTML_V6의 폰트 스택, 행간, 글자 굵기, 상단 바, 우측 인디케이터, Product 간격, Contact 폼 폭이 현재 구현과 일부 달랐음.
3. HTML_V6는 설명용 이미지 자리표시자이고, 실제 사이트는 Sanity 콘텐츠와 기존 이미지 자산을 사용하므로 내부 DOM 구조는 완전히 같을 수 없음.

### 처리 내용

- 전역 폰트를 `Inter, Pretendard, "Noto Sans KR", Arial, sans-serif`로 통일.
- Next.js가 실제 Inter 파일을 강제 로드하지 않도록 `next/font/google` 제거.
- Intro 마지막 심볼을 `logUs: Studio`로 변경하고 콜론 효과 제거.
- Intro 지정 문구와 HTML_V6 문구를 Sanity 및 fallback 데이터에 반영.
- Product 보조 문구를 `삶 속에서 그 곁을 지키는 logi를 만나보세요.`로 반영.
- Contact 본문과 문의 유형을 `서비스` 기준으로 반영.
- 이미지 위 logi 버튼·설명 오버레이를 노출하지 않도록 유지.
- Contact 문의 폼 폭을 질문 문구 기준으로 계산하도록 적용.
- Footer는 우측 정렬 4행 구조로 유지하고 주소를 넣지 않음.
- 운영 도메인은 변경하지 않고 Vercel 비공개 Preview에만 배포.

### 검증 결과

- `npm run build` 통과
- TypeScript 검사 통과
- Vercel Preview 상태 `READY`
- Preview 응답 `HTTP 200`
- 비로그인 접근 시 Vercel SSO로 이동하는 비공개 상태 확인

Preview: https://logus-brandpage-ajhfb5gdj-log-us.vercel.app

### 남은 사항

- 실제 기기별 폰트 설치 여부에 따라 최종 글리프는 달라질 수 있음.
- HTML_V6의 자리표시자 구조와 실제 CMS·이미지 구조는 목적이 달라 내부 HTML이 완전히 동일하지 않음.
- 운영 도메인에는 아직 이번 Preview를 반영하지 않음.

## 2026-08-28 — Intro 문구 확정 반영 및 이미지 후보 정리

### 요청 사항

- Intro의 확정 문구를 사용하고, 포인트 색상·Monospace는 메인 문구와 하단 설명에만 적용.
- `logUs Studio` 장면은 하단 설명 없이 별도 엔딩 장면으로 유지.
- Product 보조 문구를 `우리의 곁에 있는 logi를 만나보세요.`로 변경.
- 기존 `public/story` 이미지와 신규 생성 이미지 전체를 비교해 Intro 후보를 정리.
- 신규 생성 이미지는 `public/story/intro`에 보관하되, Intro 화면 연결은 후보 확인 후 결정.

### 처리 내용

- Sanity `siteSettings`와 로컬 fallback의 Intro 문구를 동일하게 갱신.
- 포인트 토큰(`i`, `I`, `logi`, `logUs`)만 메인 문구·하단 설명에서 코랄 Monospace로 표시.
- 심볼 영역은 기본 글꼴·기본 색상을 유지.
- 신규 Intro 이미지 5장을 WebP로 변환해 `public/story/intro`에 저장.
- Product와 Contact 이미지는 변경하지 않음.

### 이미지 후보

- 아침을 시작하는 아빠: `intro-01-father-morning-v2.webp`
- 일과 중 잠시 멈춘 엄마: `intro-02-mother-work-v2.webp`
- 공부에 몰입한 대학생 딸: `intro-03-daughter-study-v2.webp`
- 늦은 시간 책상 앞의 고등학생 아들: `intro-04-son-study-v2.webp`
- 각자의 logi가 모이는 가족 식탁: `intro-05-family-dinner-v2.webp`

### 보류

- 위 후보와 기존 이미지 중 최종 Intro 5장 확정.
- Product 진입 시 기존 `product-origin-v1.webp`를 전체 화면 전환 이미지로 사용할지 결정.

## 2026-08-28 — Intro 문구 겹침 수정 및 Preview 재배포

### 원인

- Intro 보조문구와 장면 이동 바가 화면 중앙 절대좌표에 함께 배치되어 심볼·메인 문구와 순서가 뒤집히고 겹침.

### 처리 내용

- 보조문구를 Intro 왼쪽 영역 하단 110px 기준으로 고정.
- 장면 이동 바를 하단 70px 기준으로 고정.
- 문구, 이미지, CMS 데이터와 운영 도메인은 변경하지 않음.

### 검증 결과

- `npm run build` 통과
- Intro 5개 장면 PC 화면 배치 확인
- Vercel Preview 상태 `READY`
- Preview 응답 `HTTP 200`
- 브라우저 오류 없음

Preview: https://logus-brandpage-9quhs3l4s-log-us.vercel.app
