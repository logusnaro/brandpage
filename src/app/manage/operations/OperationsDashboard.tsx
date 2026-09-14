"use client";

import { useMemo, useState } from "react";
import type { OperationsDashboardData } from "@/lib/sanity-admin";

const commands = [
  ["개발 프로세스 필수", "새 앱 착수해 [앱명]", "기획 점검해 [프로젝트]", "개발 준비해 [프로젝트]", "작업해 [프로젝트/기능]", "구현·검증해 [프로젝트/기능]", "출시 서버 준비해 [앱명]", "병합해 [프로젝트]"],
  ["중간 확인·검수", "보고해", "상태 확인해 [프로젝트]", "테스트해 [프로젝트]", "원격 테스트해 [프로젝트]", "병합하지마 [프로젝트]", "회고"],
  ["Codex 시작·종료 및 기타", "출근", "퇴근", "대시보드 최신화해", "사용법", "자리비움으로 진행해", "품의 apv-XXX 승인/보류/반려", "되돌려", "끝내"],
];
const tabs = [["summary","요약"],["projects","프로젝트"],["servers","서버 운영"],["structure","폴더 조직"],["operations","운영·명령"],["expo","Expo 출시"],["missing","빠진항목"]] as const;
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
const expoServices = [
  ["bebe_v3", "현재 핵심 앱", "Expo 전환·출시 우선 검토"],
  ["memo", "Android 앱", "Expo/EAS 적용 여부 확인 필요"],
  ["linkplan", "Android 앱", "Expo/EAS 적용 여부 확인 필요"],
  ["fortun-diary", "기획·프로토타입", "Expo 앱 구조 확정 후 적용"],
  ["bebe_v4", "개발 전 단계", "기획 확정 후 적용"],
  ["기타 03_apps", "혼합 기술 스택", "Expo 앱만 oube-release 적용"],
];

export function OperationsDashboard({ data, generatedAtLabel }: { data: OperationsDashboardData; generatedAtLabel: string }) {
  const [tab,setTab] = useState<(typeof tabs)[number][0]>("summary");
  const [projectView,setProjectView] = useState<"recent"|"stale"|"connections">("recent");
  const [selectedCommand,setSelectedCommand] = useState("");
  const projects = useMemo(() => [...data.projects].sort((a,b)=>new Date(b.updatedAt||0).getTime()-new Date(a.updatedAt||0).getTime()),[data.projects]);
  const visible = projects.filter(p => projectView === "connections" || (projectView === "recent" ? (p.idleDays ?? 999) <= 28 : (p.idleDays ?? 0) > 28));
  const summary = data.summary ?? {};
  return <section className="operations-dashboard">
    <div className="operations-toolbar"><span>실제 데이터 {generatedAtLabel}</span><button type="button" onClick={()=>location.reload()}>새로고침</button></div>
    <nav className="operations-tabs" role="tablist" aria-label="대시보드 분류">{tabs.map(([id,label])=><button key={id} role="tab" type="button" aria-selected={tab===id} onClick={()=>setTab(id)}>{label}</button>)}</nav>
    {tab==="summary" && <div className="operations-grid metrics">{[
      ["등록 프로젝트",summary.projects ?? projects.length],["Git 저장소",summary.gitRepositories ?? projects.filter(p=>p.git?.isRepository).length],["변경 있음",summary.changed ?? projects.filter(p=>(p.git?.changedFiles||0)>0).length],["주의 항목",summary.warnings ?? projects.reduce((n,p)=>n+(p.issues?.length||0),0)],["최근 4주 진행",projects.filter(p=>(p.idleDays??999)<=28).length],["1개월 초과",projects.filter(p=>(p.idleDays??0)>28).length]
    ].map(([label,value])=><article key={label}><span>{label}</span><strong>{value}</strong></article>)}</div>}
    {tab==="projects" && <><div className="operations-subtabs" role="tablist">{[["recent","최근 4주"],["stale","1개월 초과"],["connections","앱·GitHub·Codex"]].map(([id,label])=><button key={id} role="tab" type="button" aria-selected={projectView===id} onClick={()=>setProjectView(id as typeof projectView)}>{label}</button>)}</div><div className="manage-table-wrap"><table><thead><tr><th>프로젝트</th><th>현재 단계·검증</th><th>최근 갱신</th><th>경과</th><th>{projectView==="connections"?"GitHub":"다음 작업"}</th></tr></thead><tbody>{visible.map(p=><tr key={p.id}><td><b>{p.name}</b><small>{p.pathHint}</small></td><td>{p.stage}<small>{p.verification?.status||"검증 기록 없음"}</small></td><td>{p.updatedAt?new Date(p.updatedAt).toLocaleDateString("ko-KR"):"확인 필요"}</td><td>{p.idleDays ?? "-"}일</td><td>{projectView==="connections"?(p.git?.origin||"연결 없음"):(p.nextAction||"현재 작업 확인")}</td></tr>)}</tbody></table></div></>}
    {tab==="servers" && <><div className="operations-card"><h2>logUs 서버 운영 구조</h2><p>모든 앱을 한 서버로 강제하지 않습니다. 앱의 데이터·기능·출시 위험을 보고 가장 단순하고 안전한 위치를 선택합니다.</p><div className="server-map"><div><b>기록 앱</b><span>Brain · Memo · Innerbrary · LinkPlan</span><b>Day By Baby</b><span>운영 Firebase 유지</span></div><i>→</i><div><b>Codex 서버 판단 게이트</b><span>기존 데이터 · 로그인 · 권한 · 비용 · 출시 위험</span><b>선택</b><span>Firebase 유지 / logus-brain 통합 / 독립 Supabase</span></div><i>→</i><div><b>현재 운영</b><span>logus-brain · Firebase</span><b>안전장치</b><span>원본 서버 · 로컬 백업 · 롤백 기간 보존</span></div></div></div><div className="operations-card"><h2>내가 할 일은 한 문장</h2><code>출시 서버 준비해 [앱명]</code></div></>}
    {tab==="structure" && <div className="operations-card"><h2>0.logUs 폴더 조직</h2><p>보안상 웹에는 로컬 전체 경로를 노출하지 않습니다. 실제 프로젝트 레지스트리에 등록된 관리 대상만 표시합니다.</p><ul className="folder-list">{projects.map(p=><li key={p.id}><b>📁 {p.pathHint||p.name}</b><span>{p.stage} · {p.verification?.status||"검증 기록 없음"}</span></li>)}</ul></div>}
    {tab==="operations" && <><div className="operations-card"><h2>출시 서버 준비</h2><div className="server-guide"><div><b>1. 작업창</b><span>출시할 앱의 Codex 작업</span></div><div><b>2. 입력</b><code>출시 서버 준비해 [앱명]</code></div><div><b>3. 처리</b><span>보존 → 판단 → Auth·DB·권한·배포 검증</span></div></div></div>{commands.map(([title,...items])=><div className="operations-card" key={title}><h3>{title}</h3><div className="command-grid">{items.map(item=><button type="button" key={item} aria-expanded={selectedCommand===item} onClick={()=>setSelectedCommand(selectedCommand===item?"":item)}><code>{item}</code><span>설명</span></button>)}</div>{items.includes(selectedCommand)&&<p className="command-detail"><b>{selectedCommand}</b><br/>해당 프로젝트 작업에서 이 문장을 그대로 입력하면 중앙 운영 규칙에 따라 처리합니다.</p>}</div>)}</>}
    {tab==="expo" && <><div className="operations-card expo-hero"><p className="manage-kicker">EXPO RELEASE PLAYBOOK</p><h2>우리 앱 Expo 출시 가이드</h2><p>개발은 Expo CLI, 휴대폰 검수는 APK, Google Play 제출은 AAB로 진행합니다. <code>oube-release</code>는 스토어 문구·스크린샷·Fastlane 출시 자동화에 사용합니다.</p><div className="server-guide"><div><b>1. 개발</b><code>npx expo start</code><span>로컬 화면 확인</span></div><div><b>2. 검수</b><code>eas build ... preview</code><span>설치 가능한 APK</span></div><div><b>3. 출시</b><code>eas build ... production</code><span>Play 제출용 AAB</span></div></div></div><div className="operations-card"><h2>logUs 서비스별 적용 순서</h2><div className="manage-table-wrap"><table><thead><tr><th>서비스</th><th>현재 파악</th><th>권장 다음 단계</th></tr></thead><tbody>{expoServices.map(([name,current,next])=><tr key={name}><td><b>{name}</b></td><td>{current}</td><td>{next}</td></tr>)}</tbody></table></div></div><div className="operations-card"><h2>복붙 명령어</h2><p>괄호 안 값만 앱에 맞게 바꿉니다. 실제 production 빌드·제출은 파운더 승인 후 진행합니다.</p><div className="expo-command-list">{expoCommands.map(([title,command,description])=><div key={command}><b>{title}</b><code>{command}</code><span>{description}</span></div>)}</div></div><div className="operations-card"><h2>출시 판단 기준</h2><div className="expo-checklist"><span>✅ Expo Doctor 통과</span><span>✅ preview APK 실기기 검수</span><span>✅ production AAB 생성</span><span>✅ 개인정보·Data Safety 확인</span><span>✅ Play 내부 테스트 업로드</span><span>⏳ 파운더 승인 전 실제 제출 금지</span></div><p className="command-detail"><b>기억할 한 줄:</b> APK는 직접 설치용, AAB는 Google Play 제출용입니다.</p></div></>}
    {tab==="missing" && <div className="operations-grid">{missing.map(item=><article key={item}><b>{item}</b><span>기존 운영 문서의 참고 항목으로 보존합니다.</span></article>)}</div>}
  </section>;
}
