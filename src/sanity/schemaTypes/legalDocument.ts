import { defineField, defineType } from "sanity";

export const legalDocument = defineType({
  name: "legalDocument",
  title: "약관·정책",
  type: "document",
  fields: [
    defineField({ name: "title", title: "문서 이름", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "service", title: "서비스", type: "reference", to: [{ type: "product" }], validation: (rule) => rule.required() }),
    defineField({ name: "kind", title: "문서 종류", type: "string", options: { list: ["이용약관", "개인정보처리방침", "환불정책", "기타"] }, validation: (rule) => rule.required() }),
    defineField({ name: "version", title: "버전", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "effectiveDate", title: "시행일", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "status", title: "공개 상태", type: "string", options: { list: [{ title: "초안", value: "draft" }, { title: "공개", value: "published" }, { title: "보관", value: "archived" }], layout: "radio" }, initialValue: "draft", validation: (rule) => rule.required() }),
    defineField({ name: "body", title: "본문", type: "localizedText", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "title", service: "service.displayName", kind: "kind", version: "version" }, prepare: ({ title, service, kind, version }) => ({ title, subtitle: `${service || "서비스 미지정"} · ${kind || "문서"} · ${version || "버전 미지정"}` }) },
});
