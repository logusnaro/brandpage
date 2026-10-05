import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { getOperationsDashboard } from "@/lib/sanity-admin";
import { OperationsDashboard } from "./OperationsDashboard";
import "../manage.css";

export const dynamic = "force-dynamic";

export default async function OperationsPage() {
  const session = await requireAdmin();
  if (!session) redirect("/manage/login");
  let data = null;
  let error = "";
  try { data = await getOperationsDashboard(); } catch (cause) { error = cause instanceof Error ? cause.message : "운영 데이터를 불러오지 못했습니다."; }
  return <main className="manage-shell operations-shell">
    <header className="manage-header"><div><p className="manage-kicker">logUs brand operating system</p><h1>logUs 브랜드 운영시스템</h1></div><div className="manage-account"><span>{session.user?.email}</span><Link href="/manage">관리자 홈</Link></div></header>
    {error ? <div className="manage-alert">{error}</div> : null}
    <section className="manage-section"><h2>홈페이지 이미지·영상 소스</h2><p><a href="file:///C:/Users/jkhon/0.logUs/08_sources/brandpage/images/">이미지 폴더</a> · C:\Users\jkhon\0.logUs\08_sources\brandpage\images</p><p><a href="file:///C:/Users/jkhon/0.logUs/08_sources/brandpage/videos/">영상 폴더</a> · C:\Users\jkhon\0.logUs\08_sources\brandpage\videos</p><p>이 PC의 로컬 경로입니다. 브라우저가 링크를 차단하면 탐색기에서 경로를 여세요.</p></section>
    {data ? <OperationsDashboard data={data} generatedAtLabel={new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "medium", timeZone: "Asia/Seoul" }).format(new Date(data.generatedAt))} /> : null}
  </main>;
}
