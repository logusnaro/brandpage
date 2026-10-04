"use client";

import { useMemo, useState } from "react";
import type { OperationsDashboardData } from "@/lib/sanity-admin";

const commands = [
  ["개발 프로세스 필수", "새 앱 착수해 [앱명]", "기획 점검해 [프로젝트]", "개발 준비해 [프로젝트]", "작업해 [프로젝트/기능]", "구현·검증해 [프로젝트/기능]", "출시 서버 준비해 [앱명]", "병합해 [프로젝트]"],
  ["중간 확인·검수", "보고해", "상태 확인해 [프로젝트]", "테스트해 [프로젝트]", "원격 테스트해 [프로젝트]", "디자인 중간 검수해 [앱]", "디자인 최종 검수해 [앱]", "병합하지마 [프로젝트]", "회고"],
  ["Codex 시작·종료 및 기타", "출근", "퇴근", "대시보드 최신화해", "사용법", "자리비움으로 진행해", "품의 apv-XXX 승인/보류/반려", "되돌려", "끝내"],
];
const tabs = [["summary","요약"],["projects","프로젝트"],["servers","서버 운영"],["structure","폴더 조직"],["operations","운영·명령"],["expo","Expo 출시"],["missing","빠진항목"]] as const;
const appSpecs = [
  { id: "proj-brandpage", name: "brandpage", purpose: "브랜드 사이트/CMS", features: "브랜드 소개 · 제품 목록 · 문의 · 관리자 CMS", stack: "Next.js · Sanity · Vercel", source: "중앙 기능 인벤토리" },
  { id: "proj-brain", name: "brain", purpose: "2nd brain 웹앱", features: "캡처 · 회상 · 정리 · 연결 · 리플렉션", stack: "Next.js · Supabase logus-brain · Gemini/MCP", source: "중앙 기능 인벤토리" },
  { id: "proj-chat", name: "chat", purpose: "대화 아카이브 앱", features: "카카오톡 가져오기 · 미디어 연결 · 채팅 열람 · AI 검색", stack: "Flutter · Drift/SQLite · Gemini · 로컬 파일", source: "중앙 기능 인벤토리" },
  { id: "proj-fortun-diary", name: "fortun-diary", purpose: "운세·미션·일기 기획", features: "온보딩 · 타로 픽 · 미션 · 일기 · 피드백 카드 · 잉크 캘린더", stack: "기획 기준 Supabase logus-brain · Gemini", source: "중앙 기능 인벤토리" },
  { id: "proj-lucky-planner", name: "lucky-planner", purpose: "플래너·운세 기획/프로토타입", features: "일정 · 할 일 · 루틴 · 목표 · 운세 · 상담 · 결제", stack: "기획 기준 Supabase logus-brain · Gemini · RevenueCat", source: "중앙 기능 인벤토리" },
  { id: "proj-metasns", name: "metaSNS", purpose: "SNS 운영 자동화", features: "글쓰기 · 댓글 확인 · 동기화 · 스타일 학습", stack: "Discord · Threads API · Gemini · Google Sheets", source: "중앙 기능 인벤토리" },
  { id: "proj-metasns-v1", name: "metaSNS_v1", purpose: "이전 SNS 자동화 버전", features: "Discord/Threads 연동 초기 구현 (레거시 참고용)", stack: "Node.js · Discord · dotenv", source: "중앙 기능 인벤토리" },
  { id: "proj-bebe-v3", name: "bebe_v3", purpose: "육아 기록 앱", features: "로그인 · 아기/가족 프로필 · 기록 · 달력 · 상담/패턴 기능", stack: "Vite/Capacitor · Firebase Auth/Firestore (이전 대상)", source: "중앙 기능 인벤토리" },
  { id: "proj-memo", name: "memo", purpose: "범용 메모 앱", features: "자유 입력 · 일정/할 일/아이디어/노트 분류 · 플래너 · 히스토리", stack: "React/Vite/Capacitor · 온디바이스 SQLite · Supabase logus-brain", source: "중앙 기능 인벤토리" },
  { id: "proj-bebe-design-test", name: "bebe_design_test", purpose: "디자인 프로토타입", features: "Bebe 홈 화면 · 기록 UI 시안", stack: "HTML · CSS · JavaScript", source: "중앙 기능 인벤토리" },
  { id: "proj-hts-wife", name: "HTS-wife", purpose: "투자자 수급 Windows 위젯", features: "키움 REST API 투자주체별 수급 · DEMO/MOCK/LIVE · 주문/계좌 기능 없음", stack: "Windows 앱 · Kiwoom REST · OS 암호화 저장소", source: "앱 README" },
  { id: "proj-innerbrary", name: "Innerbrary / BookBap", purpose: "독서 기록 앱", features: "책 검색/ISBN · 독서 회차 · 읽기 세션 · 페이지 캡처/OCR · 기록 보관", stack: "React/Vite · Supabase logus-brain", source: "docs/03-functional-specification.md" },
  { id: "proj-linkplan", name: "LinkPlan", purpose: "가족 공동 플래너", features: "Checklist · Bucket · Package · 오늘/할 일 위젯 · 가족 공간 동기화", stack: "Android/Room · Supabase logus-brain", source: "앱 README" },
  { id: "proj-logus-remote", name: "logUs Remote", purpose: "집 PC 상태 원격 확인 도구", features: "Android 앱/위젯 · Windows 에이전트 · 상태 모드 동기화 · 전원 경고", stack: "Android/Kotlin · .NET 8 · Tailscale", source: "앱 README" },
  { id: "proj-pw-manager", name: "pw-manager", purpose: "비밀번호 변경 작업 오케스트레이션 코어", features: "대상 정규화 · 안전한 비밀번호 생성 · 상태 가드 · 비밀 마스킹 감사", stack: "로컬 Node.js · 브라우저/MFA 자동화는 미구현", source: "앱 README" },
  { id: "proj-qwen-occest", name: "MNG by QWEN", purpose: "logUs 통합 운영·판단 화면", features: "프로젝트/문서/Codex 검색 · 모니터링 · 서버/출시 현황 · QWEN 대화 패널", stack: "Windows 로컬 운영 계층 · SQLite 검색 인덱스 · QWEN", source: "docs/development-spec.md" },
  { id: "proj-readygo", name: "ReadyGo", purpose: "외출 일정 준비 앱", features: "이동시간 계산 · 권장 출발 시각 · 체크리스트 · 날씨 · 인앱 알림", stack: "모바일 앱 · Supabase logus-brain · Kakao 경로 API", source: "docs/03_FUNCTIONAL_SPECIFICATION.md" },
  { id: "proj-threads-inbox", name: "Threadbox", purpose: "Threads 정보 수집·분류 PWA", features: "게시물/댓글 수집 · QWEN 분류/요약 · 검색 · 보관 · 정기 수집", stack: "PWA · Threads 공식 사용자 토큰 · QWEN", source: "앱 README" },
] as const;
const specProjectIds = new Set<string>(appSpecs.map((app) => app.id));
const missing = ["전체 구조 시각화","완료한 것 / 해야 할 것","1~4단계 실행 흐름","구조 도입 효과 6개","사용 가이드","현재 승인된 운영 규칙","기존 4개 상태 카드"];
const expoCommands = [
  ["앱 폴더 준비", "cd <앱 폴더>", "app.json/app.config.js가 있는 폴더에서 실행"],
  ["Expo 상태 점검", "npx expo-doctor", "SDK·의존성·설정 문제를 먼저 찾습니다."],
  ["EAS 설정", "eas login && eas build:configure", "Expo 계정 로그인 후 eas.json을 생성합니다."],
  ["테스트 APK", "eas build --platform android --profile preview", "휴대폰에 직접 설치해서 내부 검수합니다."],
  ["출시 AAB", "eas build --platform android --profile production", "Google Play 제출용 AAB를 생성합니다."],
  ["Play 업로드", "eas submit --platform android", "승인 후 Google Play 업로드를 자동화합니다."],
  ["oube-release 설치", "pnpm add -D github:logusnaro/oube-release#v0.5.1", "태그 버전으로 출시 도구를 고정 설치합니다."],
  ["oube 초기화", "pnpm oube-release init", "스토어 문구·스크린샷·Fastlane 구조를 생성합니다."],
  ["도구 확인", "pnpm oube-release doctor", "fastlane·jq·Python·EAS CLI 설치 상태를 확인합니다."],
  ["문구 검사", "pnpm oube-release metadata lint", "Play/App Store 문구와 글자 수를 검사합니다."],
  ["스크린샷 생성", "pnpm oube-release screenshots all", "설정된 기기·언어별 스토어 이미지를 만듭니다."],
  ["내부 테스트 업로드", "fastlane beta platform:android", "AAB를 Play 내부 테스트 트랙에 올립니다."],
];
const commandDetails: Record<string, string> = {
  "새 앱 착수해 [앱명]": "새 앱을 실제로 만들기 전에 기획 기준을 정리합니다. 전달된 기획안을 기준으로 할지, 기존 앱 기능을 재사용할지, 참고할 디자인과 공통 기능을 무엇으로 할지 확인해 착수 조건을 기록합니다.",
  "기획 점검해 [프로젝트]": "프로젝트의 목표·사용자 흐름·개발 범위·위험·완료 기준을 점검하고, 미결정 사항과 다음 승인 단계를 정리합니다. 코드는 수정하지 않습니다.",
  "개발 준비해 [프로젝트]": "확정된 기획을 구현 가능한 설계·작업 목록·앱별 지침·검증 계획으로 바꿉니다. 필요한 승인과 위험도 함께 표시하며, 준비 단계에서 기능을 구현하지 않습니다.",
  "작업해 [프로젝트/기능]": "지정한 프로젝트와 기능만 기존 코드를 우선 활용해 작게 구현하고, 영향에 맞는 테스트를 수행합니다. 무관한 변경은 보존하고 범위를 넓히지 않습니다.",
  "구현·검증해 [프로젝트/기능]": "승인된 범위를 구현한 뒤 관련 테스트와 검증을 이어서 수행합니다. 변경 파일·테스트 결과·남은 위험을 보고하며, 병합·배포는 별도 승인을 기다립니다.",
  "출시 서버 준비해 [앱명]": "앱의 기존 데이터·로그인·권한·비용·출시 위험을 비교해 서버 선택과 안전한 이전 계획을 준비합니다. 백업·대조·롤백 조건을 먼저 정하며 실제 데이터 이전은 실행하지 않습니다.",
  "병합해 [프로젝트]": "검증된 변경을 병합할 준비가 됐는지 확인합니다. 테스트와 사용자 화면 검수가 끝나고 승인된 경우에만 병합하며, 병합 승인이 배포 승인까지 뜻하지는 않습니다.",
  "보고해": "전체 프로젝트의 최근 진행·오래된 기록·결재 대기·막힌 일과 오늘 우선순위 한 가지를 요약합니다. 보고만 요청하면 작업을 시작하지 않습니다.",
  "상태 확인해 [프로젝트]": "지정한 프로젝트의 최신 기록·브랜치·변경 상태·다음 작업·차단 사유를 확인해 현재 어디까지 왔는지 알려줍니다. 파일은 수정하지 않습니다.",
  "테스트해 [프로젝트]": "지정한 프로젝트에서 변경 범위에 맞는 기존 테스트와 점검을 실행하고 통과·실패·미검증 항목을 설명합니다. 테스트 요청만으로 기능 수정이나 배포는 하지 않습니다.",
  "원격 테스트해 [프로젝트]": "휴대폰·외부 브라우저·OAuth·webhook 등 로컬 밖에서 확인할 흐름을 원격 테스트 규칙에 따라 검증합니다. 임시 터널은 접근을 제한하고 테스트 후 종료하며 비밀값을 공개하지 않습니다.",
  "디자인 중간 검수해 [앱]": "개발 중인 화면과 흐름이 앱의 디자인 기준·가독성·사용성에 맞는지 확인하고 수정 제안을 냅니다. 별도 요청 없이는 화면 캡처나 코드 수정·배포를 하지 않습니다.",
  "디자인 최종 검수해 [앱]": "주요 화면 전체의 일관성·가독성·접근성·모바일 사용성을 출시 전 관점에서 검토합니다. 검수 결과만 보고하고 코드 수정·배포는 실행하지 않습니다.",
  "병합하지마 [프로젝트]": "해당 프로젝트의 병합을 멈추고 현재 변경과 보류 사유를 보존합니다. 별도 요청 전에는 병합·배포하지 않습니다.",
  "회고": "최근 작업 기록에서 반복된 문제·유효했던 방법·결정 사항을 추려 회사 지식과 로그를 갱신하고 다음에 이어갈 일을 정리합니다.",
  "출근": "최근 기록과 결재 대기를 확인해 어제 진행과 오늘 집중할 일 한 가지를 먼저 제안합니다. 사용자가 방향을 정하기 전에는 새 일을 시작하지 않습니다.",
  "퇴근": "오늘 변경·검증·미완료 작업을 정리해 프로젝트 로그에 남기고, 다음에 이어갈 일과 필요한 승인을 알려줍니다. 작업 내용을 임의로 되돌리지는 않습니다.",
  "대시보드 최신화해": "프로젝트 저장소와 운영 기록을 다시 읽어 프로젝트 레지스트리와 대시보드 자료를 갱신합니다. 자동 생성 대상 파일이 바뀔 수 있으므로 변경 결과를 확인합니다.",
  "사용법": "자주 쓰는 운영 명령과 언제 쓰는지 비개발자 기준으로 간단히 안내합니다. 특정 프로젝트 작업이나 설정 변경은 시작하지 않습니다.",
  "자리비움으로 진행해": "사용자가 없는 동안에도 독립적으로 안전한 작업을 계속합니다. 비용·실배포·기능 방향처럼 창업자 승인이 필요한 일은 결재 대기에 두고 실행하지 않습니다.",
  "품의 apv-XXX 승인/보류/반려": "지정된 결재 항목에 승인·보류·반려와 결정 시각을 기록합니다. 승인하면 그 품의에 적힌 범위만 실행하고, 다른 비용·배포·범위 변경은 별도 승인 대상으로 둡니다.",
  "되돌려": "작업 전 저장점과 변경 내역을 확인해 되돌릴 후보를 설명합니다. 변경을 버리는 작업은 대상과 영향을 먼저 보여주고 사용자 확인을 받은 뒤 진행합니다.",
  "끝내": "현재 작업의 결과·바뀐 파일·검증 결과·미해결 이슈·다음 할 일을 정리합니다. 끝내기 요청만으로 병합·푸시·배포하지 않습니다.",
};
const uncoveredCommands = commands.flatMap(([, ...items]) => items).filter((item) => !commandDetails[item]);
if (uncoveredCommands.length) throw new Error(`운영 명령 설명 누락: ${uncoveredCommands.join(", ")}`);
const expoServices = [
  ["bebe_v3", "당시 핵심 앱이라는 기록", "당시 Expo 전환·출시 우선 검토 메모"],
  ["memo", "당시 Android 앱이라는 기록", "Expo/EAS 적용 여부 확인 메모"],
  ["linkplan", "당시 Android 앱이라는 기록", "Expo/EAS 적용 여부 확인 메모"],
  ["fortun-diary", "당시 기획·프로토타입이라는 기록", "Expo 앱 구조 확정 후 적용 메모"],
  ["bebe_v4", "당시 개발 전 단계라는 기록", "기획 확정 후 적용 메모"],
  ["기타 03_apps", "당시 혼합 기술 스택이라는 기록", "Expo 앱에만 도구 적용 메모"],
];

export function OperationsDashboard({ data, generatedAtLabel }: { data: OperationsDashboardData; generatedAtLabel: string }) {
  const [tab,setTab] = useState<(typeof tabs)[number][0]>("summary");
  const [projectView,setProjectView] = useState<"recent"|"stale"|"connections"|"specs">("recent");
  const [selectedCommand,setSelectedCommand] = useState("");
  const projects = useMemo(() => [...data.projects].sort((a,b)=>new Date(b.updatedAt||0).getTime()-new Date(a.updatedAt||0).getTime()),[data.projects]);
  const visible = projects.filter(p => projectView === "connections" || projectView === "specs" || (projectView === "recent" ? (p.idleDays ?? 999) <= 28 : (p.idleDays ?? 0) > 28));
  const appProjects = projects.filter((project) => project.pathHint?.startsWith("03_apps/"));
  const missingSpecs = appProjects.filter((project) => !specProjectIds.has(project.id));
  const summary = data.summary ?? {};
  return <section className="operations-dashboard">
    <div className="operations-toolbar"><span>실제 데이터 {generatedAtLabel}</span><button type="button" onClick={()=>location.reload()}>새로고침</button></div>
    <nav className="operations-tabs" role="tablist" aria-label="대시보드 분류">{tabs.map(([id,label])=><button key={id} role="tab" type="button" aria-selected={tab===id} onClick={()=>setTab(id)}>{label}</button>)}</nav>
    {tab==="summary" && <div className="operations-grid metrics">{[
      ["등록 프로젝트",summary.projects ?? projects.length],["Git 저장소",summary.gitRepositories ?? projects.filter(p=>p.git?.isRepository).length],["변경 있음",summary.changed ?? projects.filter(p=>(p.git?.changedFiles||0)>0).length],["주의 항목",summary.warnings ?? projects.reduce((n,p)=>n+(p.issues?.length||0),0)],["최근 4주 진행",projects.filter(p=>(p.idleDays??999)<=28).length],["1개월 초과",projects.filter(p=>(p.idleDays??0)>28).length]
    ].map(([label,value])=><article key={label}><span>{label}</span><strong>{value}</strong></article>)}</div>}
    {tab==="projects" && <><div className="operations-subtabs" role="tablist">{[["recent","최근 4주"],["stale","1개월 초과"],["connections","앱·GitHub·Codex"],["specs","앱 스펙"]].map(([id,label])=><button key={id} role="tab" type="button" aria-selected={projectView===id} onClick={()=>setProjectView(id as typeof projectView)}>{label}</button>)}</div>{projectView==="specs"?<><div className="operations-card"><h2>앱별 스펙 요약</h2><p>원본은 <code>03_apps/APP-FEATURE-INVENTORY.md</code> (2026-09-22 1차 분석본)과 각 앱의 README·기능 명세입니다. 현재 진행 단계는 ‘최근 4주’ 및 ‘1개월 초과’ 탭에서 확인하세요.</p><p>등록 앱 {appProjects.length}개 중 요약 연결 {appProjects.length-missingSpecs.length}개 · 중앙 인벤토리 확인 필요 {missingSpecs.length}개. Google Drive에서 통합 앱 스펙 시트는 찾지 못했습니다.</p><div className="manage-table-wrap"><table><thead><tr><th>앱</th><th>성격</th><th>핵심 기능</th><th>주요 기술·연동</th></tr></thead><tbody>{appSpecs.map((app)=><tr key={app.id}><td><b>{app.name}</b><small>{app.source}</small></td><td>{app.purpose}</td><td>{app.features}</td><td>{app.stack}</td></tr>)}</tbody></table></div></div>{missingSpecs.length>0&&<div className="operations-card"><h3>중앙 인벤토리 연결 필요</h3><p>앱 폴더의 최신 문서를 기능 인벤토리와 대조하지 못해 이 목록에 남겨뒀습니다.</p><ul className="folder-list">{missingSpecs.map((project)=><li key={project.id}><b>{project.name}</b><span>{project.pathHint} · 인벤토리 대조 필요</span></li>)}</ul></div>}</>:<div className="manage-table-wrap"><table><thead><tr><th>프로젝트</th><th>현재 단계·검증</th><th>최근 갱신</th><th>경과</th><th>{projectView==="connections"?"GitHub":"다음 작업"}</th></tr></thead><tbody>{visible.map(p=><tr key={p.id}><td><b>{p.name}</b><small>{p.pathHint}</small></td><td>{p.stage}<small>{p.verification?.status||"검증 기록 없음"}</small></td><td>{p.updatedAt?new Date(p.updatedAt).toLocaleDateString("ko-KR"):"확인 필요"}</td><td>{p.idleDays ?? "-"}일</td><td>{projectView==="connections"?(p.git?.origin||"연결 없음"):(p.nextAction||"현재 작업 확인")}</td></tr>)}</tbody></table></div>}</>}
    {tab==="servers" && <><div className="operations-card"><h2>logUs 서버 운영 구조</h2><p>모든 앱을 한 서버로 강제하지 않습니다. 앱의 데이터·기능·출시 위험을 보고 가장 단순하고 안전한 위치를 선택합니다.</p><div className="server-map"><div><b>기록 앱</b><span>Brain · Memo · Innerbrary · LinkPlan</span><b>Day By Baby</b><span>운영 Firebase 유지</span></div><i>→</i><div><b>Codex 서버 판단 게이트</b><span>기존 데이터 · 로그인 · 권한 · 비용 · 출시 위험</span><b>선택</b><span>Firebase 유지 / logus-brain 통합 / 독립 Supabase</span></div><i>→</i><div><b>현재 운영</b><span>logus-brain · Firebase</span><b>안전장치</b><span>원본 서버 · 로컬 백업 · 롤백 기간 보존</span></div></div></div><div className="operations-card"><h2>내가 할 일은 한 문장</h2><code>출시 서버 준비해 [앱명]</code></div></>}
    {tab==="structure" && <div className="operations-card"><h2>0.logUs 폴더 조직</h2><p>보안상 웹에는 로컬 전체 경로를 노출하지 않습니다. 실제 프로젝트 레지스트리에 등록된 관리 대상만 표시합니다.</p><ul className="folder-list">{projects.map(p=><li key={p.id}><b>📁 {p.pathHint||p.name}</b><span>{p.stage} · {p.verification?.status||"검증 기록 없음"}</span></li>)}</ul></div>}
    {tab==="operations" && <>
      <div className="operations-card"><h2>출시 서버 준비</h2><div className="server-guide"><div><b>1. 작업창</b><span>출시할 앱의 Codex 작업</span></div><div><b>2. 입력</b><code>출시 서버 준비해 [앱명]</code></div><div><b>3. 처리</b><span>보존 → 판단 → Auth·DB·권한·배포 검증</span></div></div></div>
      <div className="operations-card"><h2>Brand 디자인 기준</h2><p>새 앱은 첫 UI 개발 전에 방향을 정하고, 기존 앱은 요청할 때만 중간·최종 검수합니다. 명령은 해당 앱의 Codex 작업창에 입력하세요.</p><div className="server-guide"><div><b>착수 전</b><code>새 앱 착수해 [앱명]</code></div><div><b>개발 중</b><code>디자인 중간 검수해 [앱]</code></div><div><b>완료 전</b><code>디자인 최종 검수해 [앱]</code></div></div></div>
      <div className="operations-card"><h2>모션그래픽 제작 기준</h2><p>주제·길이·화면 방향이 이미 정해져 있으면 다시 묻지 않습니다. 빠진 경우 시작 전에 <b>몇 초</b>인지, <b>가로(PC·YouTube 롱폼) / 세로(숏폼·SNS) / 정사각형·기타</b> 중 무엇인지 확인합니다. 목적에 맞는 기법만 조합하고 21개를 전부 억지로 넣지 않습니다.</p><p>예: <code>모션그래픽 만들어줘 — 15초, 세로 9:16, 주제: logUs 앱 소개</code>. 중앙 원문: <code>02_shared/design/MOTION-GRAPHICS-GUIDE.md</code>. Hyperframes를 요청하면 설치·사용 가능 여부를 확인해 활용하고, 불가하면 먼저 알립니다.</p><details><summary>사용 가능한 21개 모션 원칙</summary><ol><li>이징 — 부드러운 가감속</li><li>예비동작 — 큰 동작 전 준비</li><li>스쿼시 앤 스트레치 — 눌리고 늘어나는 탄력</li><li>아크 — 포물선 이동</li><li>팔로스루 — 끝부분이 늦게 따라옴</li><li>오버랩 — 부위별 시간차</li><li>스태거 — 순차 등장</li><li>매치컷 — 형태 이어서 전환</li><li>패럴랙스 — 거리별 속도차</li><li>마스크 리빌 — 가려졌다 등장</li><li>모션 블러 — 빠른 움직임 잔상</li><li>홀드 — 잠깐 멈춤</li><li>세컨더리 액션 — 보조 움직임</li><li>줌 스루 — 확대하며 장면 전환</li><li>휩 팬 — 휙 넘기는 전환</li><li>아이리스 — 원형 전환</li><li>키네틱 타이포 — 움직이는 글자</li><li>카운트업 — 숫자 증가 연출</li><li>푸시 인 — 카메라가 천천히 접근</li><li>비트 싱크 — 박자에 맞춰 움직임</li><li>루프 — 끝과 처음 연결</li></ol></details></div>
      {commands.map(([title,...items])=><div className="operations-card" key={title}><h3>{title}</h3><div className="command-grid">{items.map(item=><button type="button" key={item} aria-expanded={selectedCommand===item} onClick={()=>setSelectedCommand(selectedCommand===item?"":item)}><code>{item}</code><span>역할·기능 보기</span></button>)}</div>{items.includes(selectedCommand)&&<p className="command-detail"><b>{selectedCommand}의 역할</b><br/>{commandDetails[selectedCommand]}</p>}</div>)}
    </>}
    {tab==="expo" && <><div className="operations-card expo-hero"><p className="manage-kicker">EXPO RELEASE PLAYBOOK</p><h2>우리 앱 Expo 출시 가이드</h2><p>Expo CLI는 로컬 개발에, EAS Build는 설치·스토어용 빌드에 사용합니다. preview가 APK인지 production이 AAB인지는 앱의 <code>eas.json</code> 설정으로 확인해야 합니다. 아래 명령은 참고용이며 이 화면에서 실행하지 않습니다.</p><div className="server-guide"><div><b>1. 개발</b><code>npx expo start</code><span>로컬 개발 서버 실행</span></div><div><b>2. 기기 검수</b><code>eas build ... preview</code><span>프로필 설정에 따라 설치용 파일 생성</span></div><div><b>3. 스토어 준비</b><code>eas build ... production</code><span>프로필 설정에 따라 스토어용 파일 생성</span></div></div></div><div className="operations-card"><h2>이전 서비스별 메모 (최신 상태 아님)</h2><p>아래 앱별 구분은 원본 페이지의 2026-09-11 기록을 보존한 것입니다. 현재 기술·출시 상태로 보지 말고, 최신 값은 MNG 프로젝트·출시 기록에서 확인하세요.</p><div className="manage-table-wrap"><table><thead><tr><th>원본에 있던 서비스</th><th>주의</th></tr></thead><tbody>{expoServices.map(([name,current,next])=><tr key={name}><td><b>{name}</b></td><td>{current} · {next} (과거 메모)</td></tr>)}</tbody></table></div></div><div className="operations-card"><h2>복붙 명령어</h2><p>괄호 안 값만 앱에 맞게 바꿉니다. <code>eas.json</code>을 먼저 확인하세요. production 빌드의 비용·제출·스토어 변경은 별도 승인 후 진행합니다.</p><div className="expo-command-list">{expoCommands.map(([title,command,description])=><div key={command}><b>{title}</b><code>{command}</code><span>{description}</span></div>)}</div></div><div className="operations-card"><h2>출시 판단 기준</h2><div className="expo-checklist"><span>✅ Expo Doctor 통과</span><span>✅ preview 빌드 실기기 검수</span><span>✅ production 프로필·AAB 확인</span><span>✅ 개인정보·Data Safety 확인</span><span>✅ Play 내부 테스트 업로드 여부 확인</span><span>⏳ 파운더 승인 전 실제 제출 금지</span></div><p className="command-detail"><b>파일 형식은 프로필 설정으로 확인:</b> Android 기기 직접 설치에는 APK, Google Play에는 보통 AAB를 사용합니다. 예외 설정이 있는지 <code>eas.json</code>을 확인하세요.</p></div></>}
    {tab==="missing" && <div className="operations-grid">{missing.map(item=><article key={item}><b>{item}</b><span>기존 운영 문서의 참고 항목으로 보존합니다.</span></article>)}</div>}
  </section>;
}
