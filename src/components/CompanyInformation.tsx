import { companyInfo, type CompanyInfo } from "@/lib/companyInfo";

export function CompanyInformation({ info, locale }: { info?: Partial<CompanyInfo>; locale: "ko" | "en" }) {
  const value = companyInfo(info);
  const ko = locale === "ko";
  return <address style={{ fontStyle: "normal", maxWidth: "100%", overflowWrap: "anywhere" }}>
    <div>{value.name}</div>
    <div>{ko ? "사업자등록번호" : "Business registration number"}: {value.registrationNumber}</div>
    <div>({value.postalCode}) {ko ? value.address : value.addressEn}</div>
  </address>;
}
