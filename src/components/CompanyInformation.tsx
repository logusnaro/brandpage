import { companyInfo, type CompanyInfo } from "@/lib/companyInfo";

export function CompanyInformation({ info, locale }: { info?: Partial<CompanyInfo>; locale: "ko" | "en" }) {
  const value = companyInfo(info);
  const ko = locale === "ko";
  return <address style={{ fontStyle: "normal", maxWidth: "100%", overflowWrap: "anywhere" }}>
    <div>{value.name} · {ko ? "대표" : "Representative"}: {value.representative} · {ko ? "사업자등록번호" : "Business registration"}: {value.registrationNumber}</div>
    <div>({value.postalCode}) {ko ? value.address : value.addressEn}</div>
    <div><a href={`mailto:${value.email}`}>{value.email}</a> · <a href={`tel:${value.phone.replace(/[^+\d]/g, "")}`}>{value.phone}</a></div>
    {value.mailOrderNumber ? <div>{ko ? "통신판매업 신고" : "Mail-order registration"}: {value.mailOrderNumber}{value.mailOrderAuthority ? ` (${value.mailOrderAuthority})` : ""}</div> : null}
  </address>;
}
