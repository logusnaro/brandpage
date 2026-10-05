"use client";
import {useEffect,useState} from "react";
type Stats={today:number;total:number;date:string;environment:string;truncated:boolean;pages:Array<{path:string;views:number;seconds:number;average:number}>};
export default function VisitStatistics() {
  const [stats,setStats]=useState<Stats|null>(null),[error,setError]=useState("");
  const load=()=>fetch("/api/manage/stats",{cache:"no-store"}).then(async r=>{if(!r.ok) throw new Error(r.status===401?"통계는 Google 관리자 로그인 후 볼 수 있습니다.":"통계를 불러오지 못했습니다.");setStats(await r.json());setError("");}).catch(e=>setError(e.message));
  useEffect(()=>{load();},[]);
  return <div style={{padding:32,maxWidth:1100,margin:"auto",overflow:"auto"}}><h1>홈페이지 방문 통계</h1><p>한국 시간 기준 · {stats?.environment==="production"?"공식 사이트":"테스트 사이트"}</p><p><a href="/manage/login">Google 관리자 로그인</a> · <a href="/manage">브랜드 운영시스템</a> · <button onClick={load}>새로고침</button></p>{error?<p role="alert">{error}</p>:null}{stats?<><div style={{display:"flex",gap:40,flexWrap:"wrap"}}><p>오늘 방문자(세션)<br/><strong style={{fontSize:36}}>{stats.today}</strong></p><p>총 방문자(세션)<br/><strong style={{fontSize:36}}>{stats.total}</strong></p></div><h2>주로 머문 페이지 · 최근 30일</h2><table style={{width:"100%",textAlign:"left"}}><thead><tr><th>페이지</th><th>열람</th><th>총 체류</th><th>평균 체류</th></tr></thead><tbody>{stats.pages.map(p=><tr key={p.path}><td>{p.path}</td><td>{p.views}</td><td>{Math.round(p.seconds/60)}분</td><td>{p.average}초</td></tr>)}</tbody></table>{!stats.pages.length?<p>공개 후 수집되는 통계가 여기에 표시됩니다.</p>:null}{stats.truncated?<p>조회 한도에 도달해 일부 기록만 표시됩니다.</p>:null}</>:<p>통계 불러오는 중…</p>}<p>브라우저 탭의 방문 세션 기준입니다. 재접속·다른 기기는 별도 방문으로 집계될 수 있습니다. 화면이 보이는 시간만 측정하며 IP·이메일·검색어는 저장하지 않습니다. 추적 금지 설정은 존중합니다.</p></div>;
}
