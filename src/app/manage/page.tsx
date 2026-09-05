import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { getAdminOverview } from "@/lib/sanity-admin";
import { logout } from "./actions";
import { ReleaseUploader } from "./ReleaseUploader";
import { ShareButton } from "./ShareButton";
import "./manage.css";

export const dynamic = "force-dynamic";

export default async function ManagePage() {
  const session = await requireAdmin();
  if (!session) redirect("/manage/login");
  let overview: Awaited<ReturnType<typeof getAdminOverview>> | null = null;
  let dataError = "";
  try {
    overview = await getAdminOverview();
  } catch (error) {
    dataError = error instanceof Error ? error.message : "관리 데이터를 불러오지 못했습니다.";
  }
  const services = overview?.services ?? [];
  const releases = overview?.releases ?? [];
  return (
    <main className="manage-shell">
      <header className="manage-header">
        <div><p className="manage-kicker">logUs Studio</p><h1>브랜드 운영시스템</h1></div>
        <div className="manage-account"><span>{session.user?.email}</span><form action={logout}><button type="submit">로그아웃</button></form></div>
      </header>

      <nav className="manage-nav" aria-label="관리 메뉴">
        <a href="#dashboard">대시보드</a><a href="#release">릴리스</a><a href="#content">콘텐츠</a><a href="#brand">브랜드 운영</a>
      </nav>

      {dataError ? <div className="manage-alert">{dataError}</div> : null}

      <section id="dashboard" className="manage-section">
        <div className="manage-section-title"><p>Overview</p><h2>오늘 관리할 것</h2></div>
        <div className="manage-stats">
          <article><strong>{services.length}</strong><span>서비스</span></article>
          <article><strong>{releases.filter((item) => item.isLatest).length}</strong><span>최신 릴리스</span></article>
          <article><strong>{overview?.legalCount ?? 0}</strong><span>약관·정책</span></article>
          <article><strong>{overview?.mascotCount ?? 0}</strong><span>logU 캐릭터</span></article>
        </div>
      </section>

      <section id="release" className="manage-section">
        <div className="manage-section-title"><p>Releases</p><h2>APK 최신 버전</h2></div>
        <ReleaseUploader services={services} />
        <div className="manage-table-wrap"><table><thead><tr><th>서비스</th><th>버전</th><th>범위</th><th>최신</th><th>파일</th></tr></thead><tbody>
          {releases.map((release) => <tr key={release._id}><td>{release.serviceName || "미지정"}</td><td>{release.version}</td><td>{release.visibility}</td><td>{release.isLatest ? "최신" : "이전"}</td><td>{release.storageKey ? <><a href={`/api/manage/releases/${release._id}/download`}>다운로드</a>{release.visibility === "shared" ? <> · <ShareButton releaseId={release._id} /></> : null}</> : release.downloadUrl ? <a href={release.downloadUrl}>웹 열기</a> : "없음"}</td></tr>)}
          {!releases.length ? <tr><td colSpan={5}>등록된 릴리스가 없습니다.</td></tr> : null}
        </tbody></table></div>
      </section>

      <section id="content" className="manage-section">
        <div className="manage-section-title"><p>Content</p><h2>홈페이지와 운영 자료</h2></div>
        <div className="manage-links">
          <Link href="/admin/structure/siteSettings;siteSettings" target="_blank"><strong>홈페이지 문구</strong><span>Intro, Product, Contact 한국어·영어</span></Link>
          <Link href="/admin/structure/product" target="_blank"><strong>서비스</strong><span>제품 소개와 홈페이지 노출</span></Link>
          <Link href="/admin/structure/legalDocument" target="_blank"><strong>약관·정책</strong><span>서비스별 버전과 시행일</span></Link>
          <Link href="/admin/structure/mascot" target="_blank"><strong>logU 캐릭터</strong><span>서비스별 이미지, 성격과 기억 테마</span></Link>
        </div>
      </section>

      <section id="brand" className="manage-section">
        <div className="manage-section-title"><p>Brand</p><h2>중앙 운영 연결</h2></div>
        <p className="manage-description">로컬 0.logUs 폴더의 내부 경로와 전체 파일 목록은 공개하지 않습니다. 허용된 프로젝트 요약만 이 화면에 연결할 예정입니다.</p>
      </section>
    </main>
  );
}
