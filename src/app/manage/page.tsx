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
        <a href="#dashboard">대시보드</a><a href="#release">릴리스</a><a href="#content">콘텐츠</a><Link href="/manage/operations">운영 대시보드</Link><a href="#brand">브랜드 운영</a>
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
          <Link href="/admin/structure/siteSettings;siteSettings" target="_blank"><strong>홈페이지 문구·이미지·영상</strong><span>현재 영상형 홈페이지, Apps 안내, Contact 폼, 푸터 · 한국어·영어</span></Link>
          <Link href="/admin/structure/product" target="_blank"><strong>서비스 소개·영상·스토어 링크</strong><span>소개 문구, 사진, 특징, 차별 기능, Android·iOS·앱인토스·웹</span></Link>
          <Link href="/admin/structure/legalDocument" target="_blank"><strong>약관·정책</strong><span>서비스별 버전과 시행일</span></Link>
          <Link href="/admin/structure/mascot" target="_blank"><strong>logU 캐릭터</strong><span>서비스별 이미지, 성격과 기억 테마</span></Link>
          <Link href="/admin/structure/socialLink" target="_blank"><strong>SNS 링크</strong><span>푸터 채널, 주소와 표시 순서</span></Link>
        </div>
        <p className="manage-description">Sanity에서 수정 후 Publish를 눌러야 공개 화면에 반영됩니다. 캐시 때문에 즉시 보이지 않을 수 있습니다. 빈 설정은 현재 디자인의 기본값을 유지합니다. 앱 소개 공개 상태와 플랫폼 출시 상태는 별도로 관리하세요.</p>
      </section>

      <section id="brand" className="manage-section">
        <div className="manage-section-title"><p>Brand</p><h2>중앙 운영 연결</h2></div>
        <p className="manage-description">로컬 0.logUs의 실제 프로젝트·검증 상태를 관리자 전용 운영 대시보드에서 확인합니다.</p>
      </section>
    </main>
  );
}
