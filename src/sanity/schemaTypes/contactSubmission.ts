import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "문의",
  description: "웹 문의는 인증이 필요한 private.contacts 경로에만 저장합니다. 답변과 관련 후속 요청 처리가 완료되면 삭제 기능으로 개인정보를 지체 없이 파기하세요. 완료 상태만 표시하고 계속 보관하지 마세요.",
  liveEdit: true,
  type: "document",
  fields: [
    defineField({ name: "privacyConsent", title: "개인정보 수집·이용 동의", type: "boolean", readOnly: true }),
    defineField({ name: "overseasConsent", title: "국외 이전 동의", type: "boolean", readOnly: true }),
    defineField({ name: "consentedAt", title: "동의 접수 시각", type: "datetime", readOnly: true }),
    defineField({ name: "noticeVersion", title: "동의 안내 버전", type: "string", readOnly: true }),
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
