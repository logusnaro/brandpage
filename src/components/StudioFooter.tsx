import { CompanyInformation } from "@/components/CompanyInformation";
import type { CompanyInfo } from "@/lib/companyInfo";
import type { Locale, LocalizedText } from "@/sanity/lib/types";

type Props = {
  businessInfo?: Partial<CompanyInfo>;
  copyright?: Partial<LocalizedText>;
  locale: Locale;
  tagline: string;
};

function copyrightLine(value: string | undefined, locale: Locale) {
  const fallback = "© 2026 logUs Studio.";
  const legacyTagline = locale === "ko" ? "작은 순간을 기록합니다." : "Keeping the little things.";
  return (value || fallback)
    .replace(legacyTagline, "")
    .replace(/\s*All rights reserved\./i, "")
    .trim() || fallback;
}

export function StudioFooter({ businessInfo, copyright, locale, tagline }: Props) {
  const ko = locale === "ko";

  return (
    <footer className="studio-footer">
      <p className="studio-footer-tagline">{tagline}</p>
      <CompanyInformation info={businessInfo} locale={locale} />
      <div className="studio-footer-copyright">
        {copyrightLine(copyright?.[locale], locale)}
      </div>
      <nav className="studio-footer-links" aria-label={ko ? "법적 고지" : "Legal information"}>
        <a href={`/legal/studio/terms?lang=${locale}`}>{ko ? "이용약관" : "Terms of Use"}</a>
        <span aria-hidden="true"> · </span>
        <a href={`/legal/studio/privacy?lang=${locale}`}>{ko ? "개인정보 처리방침" : "Privacy Policy"}</a>
        <span aria-hidden="true"> · </span>
        <a href="/analytics-info">{ko ? "방문 통계 안내" : "Analytics Information"}</a>
      </nav>
    </footer>
  );
}
