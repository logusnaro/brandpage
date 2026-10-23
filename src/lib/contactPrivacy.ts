export const CONTACT_NOTICE_VERSION = "2026-10-23";

export const contactPrivacyNotice = {
  ko: {
    title: "개인정보 수집·이용 안내",
    purpose: "목적: 문의 확인, 답변 및 관련 후속 요청 처리",
    items: "항목: 이름 또는 닉네임, 이메일, 문의 유형·내용, 작성 언어, 접수·동의 시각과 동의 안내 버전",
    retention: "보유기간: 문의 답변 및 관련 요청 처리 완료 시까지. 처리 완료 후 지체 없이 삭제합니다.",
    refusal: "동의를 거부할 수 있으며, 거부 시 이 문의 폼을 이용할 수 없습니다. 이메일로도 문의할 수 있습니다.",
    sensitive: "주민등록번호, 건강정보, 비밀번호 등 민감하거나 불필요한 정보는 입력하지 마세요.",
    policy: "개인정보 처리방침 보기",
    overseasConsent: "문의 처리를 위한 개인정보 국외 이전에 동의합니다.",
    overseasTitle: "국외 이전(처리위탁·보관) 안내",
    overseas: "이전받는 자: Sanity(privacy@sanity.io), Vercel Inc.(privacy@vercel.com). 국가: Sanity의 벨기에·미국 인프라, Vercel의 미국 인프라. 문의 제출 시 이름·이메일·문의 유형과 내용·언어·접수 및 동의 정보를 암호화된 통신으로 전송합니다. Vercel은 문의 요청 처리, Sanity는 문의 저장·관리 목적으로 처리하며 문의 및 후속 요청 처리 완료 시까지 보유 후 삭제합니다. 제공자의 보안 로그·백업은 각 제공자의 보관·삭제 절차에 따릅니다. 국외 이전 동의를 거부할 수 있으나 거부 시 웹 문의 폼을 이용할 수 없으며, 전화로 문의할 수 있습니다.",
  },
  en: {
    title: "Personal information collection and use",
    purpose: "Purpose: reviewing and responding to your inquiry and related follow-up requests.",
    items: "Information: name or nickname, email, inquiry type and message, language, receipt/consent time and notice version.",
    retention: "Retention: until the inquiry and related requests have been handled, followed by deletion without undue delay.",
    refusal: "You may decline consent. This form requires consent; you can also contact us by email.",
    sensitive: "Please do not include identity numbers, health information, passwords or other unnecessary sensitive information.",
    policy: "Read the privacy policy",
    overseasConsent: "I consent to the overseas processing and storage of my inquiry.",
    overseasTitle: "Overseas processing and storage",
    overseas: "Recipients: Sanity (privacy@sanity.io) and Vercel Inc. (privacy@vercel.com). Countries: Belgium and the United States for Sanity infrastructure; the United States for Vercel. On submission, your name, email, inquiry type/message, language and receipt/consent information are sent over encrypted connections. Vercel processes the request; Sanity stores and manages inquiries until the inquiry and follow-up requests are completed, followed by deletion. Provider security logs and backups follow their retention/deletion procedures. You may decline this transfer; the web form then cannot be used, but you may contact us by telephone.",
  },
} as const;
