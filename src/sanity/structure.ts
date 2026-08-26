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
      S.documentTypeListItem("socialLink").title("SNS 링크"),
    ]);
