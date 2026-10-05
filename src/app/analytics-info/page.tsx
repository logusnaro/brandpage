import Link from "next/link";
export default function AnalyticsInfo() {
  return <main style={{maxWidth:760,margin:"60px auto",padding:24,lineHeight:1.8}}>
    <h1>홈페이지 방문 통계 안내</h1>
    <p>logUs Studio는 홈페이지 개선을 위해 방문 세션, 열람한 페이지, 화면이 보이는 동안의 체류 시간을 집계합니다.</p>
    <p>이름, 이메일, IP 주소, 검색어, 문의 내용은 방문 통계에 저장하지 않습니다. 브라우저 탭의 임의 세션값은 서버에서 해시 처리하며 광고 추적이나 다른 사이트와의 결합에 사용하지 않습니다. 추적 쿠키는 사용하지 않습니다.</p>
    <p>Cloudflare R2 비공개 저장소에 페이지 통계를 보관하며 logus.naro@gmail.com 관리자만 통계 화면을 조회할 수 있습니다. 브라우저의 추적 금지 설정을 켜면 수집하지 않습니다. 브라우저 탭을 닫으면 세션값이 사라집니다.</p>
    <p>현재 통계 기록은 운영 기간 동안 보관합니다. 삭제 등 문의는 logus.naro@gmail.com으로 보내주세요. 테스트 사이트 기록은 공식 사이트 기록과 구분합니다.</p>
    <p lang="en">We measure anonymous browser-tab visits, page views and visible time to improve this website. We do not store names, email addresses, IP addresses, queries or form content in analytics, use tracking cookies, or combine these records with other websites. Do Not Track is respected. Records are kept in private Cloudflare R2 storage during operation, accessible to the administrator. Contact logus.naro@gmail.com for questions.</p>
    <Link href="/">홈페이지로 돌아가기</Link>
  </main>;
}
