export type CompanyInfo = {
  name: string;
  representative: string;
  registrationNumber: string;
  address: string;
  addressEn: string;
  postalCode: string;
  email: string;
  phone: string;
  privacyOfficer: string;
  mailOrderNumber: string;
  mailOrderAuthority: string;
};

// Registration certificate and existing published contact details; address updated by the founder.
// Do not copy the certificate's former residential address or date of birth into public content.
export const defaultCompanyInfo: CompanyInfo = {
  name: "로그어스 스튜디오(logUs Studio)",
  representative: "홍중기",
  registrationNumber: "701-12-03312",
  address: "서울 강남구 언주로134길 18, 5층",
  addressEn: "5F, 18, Eonju-ro 134-gil, Gangnam-gu, Seoul, Republic of Korea",
  postalCode: "06061",
  email: "logus.naro@gmail.com",
  phone: "010-4964-9442",
  privacyOfficer: "홍중기",
  // Populate only from a confirmed report certificate; blank does not assert an exemption.
  mailOrderNumber: "",
  mailOrderAuthority: "",
};

export function companyInfo(value?: Partial<CompanyInfo> | null): CompanyInfo {
  return Object.fromEntries(Object.entries(defaultCompanyInfo).map(([key, fallback]) => [
    key, typeof value?.[key as keyof CompanyInfo] === "string"
      ? value[key as keyof CompanyInfo]!.trim() || fallback : fallback,
  ])) as CompanyInfo;
}
