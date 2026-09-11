import { defineField, defineType } from "sanity";

export const operationsSnapshot = defineType({
  name: "operationsSnapshot",
  title: "운영 대시보드 스냅샷",
  type: "document",
  fields: [
    defineField({ name: "generatedAt", title: "갱신 시각", type: "datetime", readOnly: true }),
    defineField({ name: "payload", title: "실제 운영 데이터", type: "text", readOnly: true }),
  ],
});
