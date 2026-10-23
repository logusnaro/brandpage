import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import Link from "next/link";
import { fetchPageData } from "@/sanity/lib/fetchPageData";
import { companyInfo } from "@/lib/companyInfo";
import { websitePolicy } from "@/content/websitePolicies";

type Params = { service: string; kind: string };
type LegalDocument = {
  title: string;
  version: string;
  effectiveDate: string;
  body?: { ko?: string; en?: string };
};

const KIND_LABEL: Record<string, string> = {
  terms: "이용약관",
  privacy: "개인정보처리방침",
  ai: "AI 사용방침",
  refund: "환불정책",
  other: "기타 정책",
};

async function getDocument(params: Params, locale: "ko" | "en" = "ko") {
  const kind = KIND_LABEL[params.kind];
  if (!kind) return null;
  if (params.service === "studio") {
    if (params.kind !== "privacy" && params.kind !== "terms") return null;
    const { settings } = await fetchPageData();
    const fallback = websitePolicy(params.kind, locale, companyInfo(settings.businessInfo));
    const published = await client.fetch<LegalDocument | null>(
      `*[_type == "legalDocument" && scope == "site" && kind == $kind && status == "published"] | order(effectiveDate desc)[0]{ title, version, effectiveDate, body }`,
      { kind }, { next: { revalidate: 300 } },
    ).catch(() => null);
    return published?.body?.[locale]?.trim()
      ? { ...published, body: { [locale]: published.body[locale] } }
      : { ...fallback, body: { [locale]: fallback.body } };
  }
  return client.fetch<LegalDocument | null>(
    `*[_type == "legalDocument" && coalesce(scope, "service") == "service" && service->name.current == $service && kind == $kind && status == "published"] | order(effectiveDate desc)[0]{ title, version, effectiveDate, body }`,
    { service: params.service, kind },
    { next: { revalidate: 300 } },
  );
}

type Props = { params: Promise<Params>; searchParams: Promise<{ lang?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const locale = (await searchParams).lang === "en" ? "en" : "ko";
  const document = await getDocument(await params, locale);
  return { title: document ? `${document.title} | logUs Studio` : "문서를 찾을 수 없습니다 | logUs Studio" };
}

export default async function LegalDocumentPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const locale = (await searchParams).lang === "en" ? "en" : "ko";
  const document = await getDocument(resolvedParams, locale);
  if (!document) notFound();
  const body = document.body?.[locale] || document.body?.ko || document.body?.en || "";
  return (
    <main lang={locale} className="mx-auto min-h-screen w-full max-w-3xl px-5 py-14 text-[var(--ink)] sm:px-8">
      <article className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm sm:p-10">
        <header className="border-b border-black/10 pb-6">
          <nav className="flex flex-wrap justify-between gap-4 text-sm text-black/60" aria-label={locale === "ko" ? "정책 페이지 메뉴" : "Policy navigation"}>
            <Link href="/" className="text-[22px] font-[750] tracking-[-0.035em] sm:text-[27px]">logUs Studio</Link>
            <Link href={`/legal/${resolvedParams.service}/${resolvedParams.kind}?lang=${locale === "ko" ? "en" : "ko"}`} lang={locale === "ko" ? "en" : "ko"}>{locale === "ko" ? "English" : "한국어"}</Link>
          </nav>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{document.title}</h1>
          <p className="mt-3 text-sm text-black/50">{locale === "ko" ? "버전" : "Version"} {document.version} · {locale === "ko" ? "시행일" : "Effective"} {document.effectiveDate}</p>
        </header>
        <div className="mt-8 whitespace-pre-wrap break-words text-[15px] leading-8 text-black/75">{body}</div>
        {resolvedParams.service === "studio" && resolvedParams.kind === "privacy" ? <nav className="mt-8 flex flex-wrap gap-4 border-t border-black/10 pt-6 text-sm underline" aria-label={locale === "ko" ? "관련 개인정보 안내" : "Related privacy notices"}>
          <Link href="/analytics-info">{locale === "ko" ? "방문 통계 안내" : "Visit statistics"}</Link>
          <a href="https://www.sanity.io/legal/privacy" target="_blank" rel="noreferrer">Sanity Privacy</a>
          <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Vercel Privacy</a>
        </nav> : null}
      </article>
    </main>
  );
}
