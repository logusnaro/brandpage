import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("logUs Studio 관리")
    .items([
      S.listItem()
        .title("홈페이지 문구 · 한국어/English")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("홈페이지 문구 · 한국어/English"),
        ),
      S.divider(),
      S.documentTypeListItem("product").title("제품 관리"),
      S.documentTypeListItem("mascot").title("logU 캐릭터 관리"),
      S.documentTypeListItem("appRelease").title("앱 릴리스 관리"),
      S.documentTypeListItem("legalDocument").title("약관·정책 관리"),
      S.documentTypeListItem("contactSubmission").title("문의함"),
      S.documentTypeListItem("socialLink").title("SNS 링크"),
    ]);
