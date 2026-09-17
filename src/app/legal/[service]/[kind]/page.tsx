import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";

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
  refund: "환불정책",
  other: "기타 정책",
};

async function getDocument(params: Params) {
  const kind = KIND_LABEL[params.kind];
  if (!kind) return null;
  return client.fetch<LegalDocument | null>(
    `*[_type == "legalDocument" && service->name.current == $service && kind == $kind && status == "published"] | order(effectiveDate desc)[0]{ title, version, effectiveDate, body }`,
    { service: params.service, kind },
    { next: { revalidate: 300 } },
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const document = await getDocument(await params);
  return { title: document ? `${document.title} | logUs Studio` : "문서를 찾을 수 없습니다 | logUs Studio" };
}

export default async function LegalDocumentPage({ params }: { params: Promise<Params> }) {
  const document = await getDocument(await params);
  if (!document) notFound();
  const body = document.body?.ko || document.body?.en || "";
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 py-14 text-[var(--ink)] sm:px-8">
      <article className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm sm:p-10">
        <header className="border-b border-black/10 pb-6">
          <p className="text-sm font-semibold tracking-[0.14em] text-black/45">ALLinMEMO</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{document.title}</h1>
          <p className="mt-3 text-sm text-black/50">버전 {document.version} · 시행일 {document.effectiveDate}</p>
        </header>
        <div className="mt-8 whitespace-pre-wrap text-[15px] leading-8 text-black/75">{body}</div>
      </article>
    </main>
  );
}
