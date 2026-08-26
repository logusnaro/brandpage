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
