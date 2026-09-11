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
    {data ? <OperationsDashboard data={data} generatedAtLabel={new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "medium", timeZone: "Asia/Seoul" }).format(new Date(data.generatedAt))} /> : null}
  </main>;
}
