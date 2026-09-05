import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "문의",
  type: "document",
  fields: [
    defineField({ name: "inquiryType", title: "문의 유형", type: "string" }),
    defineField({ name: "name", title: "이름 또는 닉네임", type: "string" }),
    defineField({ name: "email", title: "답변받을 이메일", type: "string" }),
    defineField({ name: "message", title: "문의 내용", type: "text", rows: 8 }),
    defineField({ name: "locale", title: "작성 언어", type: "string" }),
    defineField({ name: "receivedAt", title: "접수 시각", type: "datetime" }),
    defineField({ name: "status", title: "처리 상태", type: "string", options: { list: [{ title: "새 문의", value: "new" }, { title: "확인", value: "read" }, { title: "답변 완료", value: "resolved" }] }, initialValue: "new" }),
  ],
  preview: { select: { title: "name", email: "email", status: "status" }, prepare: ({ title, email, status }) => ({ title: title || "이름 없음", subtitle: `${email || "이메일 없음"} · ${status || "new"}` }) },
});
