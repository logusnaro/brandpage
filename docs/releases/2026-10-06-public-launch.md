# 공식 홈페이지 · 관리자 통계

파운더 승인: 2026-10-06 공식 오픈, 미디어 중앙화, 관리자 방문 통계 요청.

## 범위와 데이터
- 공식 `https://logusstudio.com`, 테스트 `https://test.logusstudio.com` 유지. Cloudflare DNS + 기존 Vercel 실행.
- `/admin`: 기존 Sanity 편집 기능 유지, 서버에서 Google 계정 `logus.naro@gmail.com` 접근 제한. 추가 메뉴 `/admin/visits`.
- 방문 통계: 기존 private R2 `analytics/v1/{production|test}/{한국날짜}/{HMAC 세션}/{열람 UUID}.json`.
- 저장: 공개 페이지 경로·화면이 보이는 누적 초. IP·이메일·쿼리·문의 원문 없음. 요청 제한에 쓰는 IP는 프로세스 메모리의 HMAC으로만 1분간 유지.
- 브라우저 탭 세션 기준 오늘·누적 방문. 실제 사람 수 아님. DNT 존중. 추적 쿠키 없음. 페이지 통계 최근 30일, 최대 5,000개 열람; 누적 목록 최대 100,000개. 한도 도달은 화면 경고.
- 집계는 기존 R2 9GiB 한도 도달 시 중단. 서버 인스턴스별 20회/분 요청 제한은 분산 시스템의 전역 비용 한도를 보장하지 않음.
- 수집 안내 `/analytics-info`. 개인정보·수집 법률 해석에 대한 인증/법률 검토를 주장하지 않음.
- **기존 두 도메인의 Sanity 콘텐츠 dataset은 production을 공유함. 테스트 관리자에서 Publish하면 공식 콘텐츠에도 반영될 수 있음.** 신규 데이터셋·CMS 원격 수정 없음.
- 새로운 MemoGrip 대표·hero·첫 기능 이미지 반영. 기존 영상 파일은 이전 캐릭터를 포함하며 재렌더링하지 않음.

## 중앙 보관
`C:\Users\jkhon\0.logUs\08_sources\brandpage\images` / `videos`.
298개 이미지, 59개 영상·자막, 총357개 고유 파일. 원본420개 출처를 manifest에 연결. 모든 복사 SHA-256 대조 통과.
브랜드 HTML 운영 탭·웹 운영 관리자·MNG by QWEN 운영 자산에 경로와 file 링크. 웹 브라우저는 file 링크 차단 가능, 탐색기 경로 사용.

## 검증과 적용 기준
| 기준 | 적용 | 증거 |
|---|---|---|
| 웹 코드/QA | 적용 | Next16.3.6 build, 변경 ESLint, TypeScript, HTTP 회귀 |
| 관리자 인가 | 적용 | 기존 NextAuth Google allowlist, admin307/통계401 |
| 데이터·통계 | 적용 | 중복·역순·ETag 충돌·환경 분리 단위 테스트 |
| 비공개 저장 | 적용 | 서버 SDK만 R2 접근, 브라우저 키 없음, 공개 객체 링크 없음 |
| 모바일/스토어 정책 | 비적용 | APK/AAB/iOS 변경 없음 |
| 원격 CMS Publish | 이번 변경에 비적용 | CMS 데이터/스키마 변경 없음; 기존 편집 실사용 후속 검수 유지 |
| 의존성 | 기존 증거 재사용 | 16.3.6 패치 이후 lockfile 변경 없음. 기존 CLI 의존성 경고 유지 |

자동검증: scripts/test-visit-stats.cjs, scripts/test-app-routes.mjs, archive hash 검증, 두 HTML inline JS 컴파일.
로컬 R2 실제검증은 credentials가 production 비공개 설정에만 있어 실행불가. 비밀값 조회/로그 노출하지 않음. 배포 후 `/api/visits` 테스트 도메인 저장으로 확인 필요.
웹 화면 신규 캡처 생략. 실제 Google→Sanity 편집 흐름은 기존 동작이며 이번 로그인 방어 이후 사용자 로그인이 필요한 후속 확인.

## 롤백
이전 READY 배포 `dpl_12Zp4uVo6j3z9MiVnFKfra4VRuvk`로 promote 가능. 운영 DB/CMS migration 없음. 새 미디어 경로는 구버전을 보존함.
