import Link from "next/link";

export default function AppNotFound() {
  return <main style={{ padding: "120px 24px", textAlign: "center" }}>
    <h1>앱을 찾을 수 없습니다. / App not found.</h1>
    <Link href="/apps">모든 앱 보기 / Explore apps →</Link>
  </main>;
}
