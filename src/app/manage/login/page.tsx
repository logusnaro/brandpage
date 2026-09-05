import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { hasAdminConfiguration } from "@/lib/admin";
import { login } from "../actions";
import "../manage.css";

export default async function ManageLoginPage() {
  const configured = hasAdminConfiguration();
  if (configured && await auth()) redirect("/manage");
  return (
    <main className="manage-login">
      <section className="manage-login-card">
        <p className="manage-kicker">logUs Studio</p>
        <h1>브랜드 운영시스템</h1>
        <p>홈페이지, 서비스, 릴리스, 약관과 logU를 한 곳에서 관리합니다.</p>
        <form action={login}>
          <button type="submit" disabled={!configured}>Google 계정으로 로그인</button>
        </form>
        {!configured ? <small>Google OAuth 환경변수를 연결하면 로그인이 활성화됩니다.</small> : null}
      </section>
    </main>
  );
}
