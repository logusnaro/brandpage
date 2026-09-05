import { defineField, defineType } from "sanity";

export const mascot = defineType({
  name: "mascot",
  title: "logU 캐릭터",
  type: "document",
  fields: [
    defineField({ name: "name", title: "캐릭터 이름", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "service", title: "연결 서비스", type: "reference", to: [{ type: "product" }] }),
    defineField({ name: "status", title: "상태", type: "string", options: { list: [
      { title: "준비 중", value: "draft" },
      { title: "사용 중", value: "active" },
      { title: "보관", value: "archived" },
    ], layout: "radio" }, initialValue: "draft", validation: (rule) => rule.required() }),
    defineField({ name: "visibility", title: "노출", type: "string", options: { list: [
      { title: "관리자만", value: "private" },
      { title: "공개 가능", value: "public" },
    ], layout: "radio" }, initialValue: "private", validation: (rule) => rule.required() }),
    defineField({ name: "avatar", title: "대표 이미지", type: "image", options: { hotspot: true } }),
    defineField({ name: "expressions", title: "표정·포즈 이미지", type: "array", of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "label", title: "장면 설명", type: "string" })] }], options: { layout: "grid" } }),
    defineField({ name: "memoryTheme", title: "간직하는 기억", type: "localizedText" }),
    defineField({ name: "personality", title: "성격·말투", type: "localizedText" }),
    defineField({ name: "color", title: "대표 색상", type: "string" }),
    defineField({ name: "notes", title: "제작 메모", type: "text", rows: 5 }),
  ],
  preview: { select: { title: "name", service: "service.displayName", media: "avatar", status: "status" }, prepare: ({ title, service, media, status }) => ({ title, subtitle: `${service || "서비스 미지정"} · ${status || "상태 미지정"}`, media }) },
});
