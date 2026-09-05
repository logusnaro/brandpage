import { defineField, defineType } from "sanity";

export const appRelease = defineType({
  name: "appRelease",
  title: "앱 릴리스",
  type: "document",
  fields: [
    defineField({ name: "service", title: "서비스", type: "reference", to: [{ type: "product" }], validation: (rule) => rule.required() }),
    defineField({ name: "platform", title: "플랫폼", type: "string", options: { list: ["Android APK", "Web app", "iOS"] }, validation: (rule) => rule.required() }),
    defineField({ name: "version", title: "버전", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "releaseDate", title: "배포일", type: "date" }),
    defineField({ name: "visibility", title: "다운로드 범위", type: "string", options: { list: [{ title: "홈페이지 공개", value: "public" }, { title: "관리자만", value: "private" }, { title: "공유 링크만", value: "shared" }], layout: "radio" }, initialValue: "private", validation: (rule) => rule.required() }),
    defineField({ name: "downloadUrl", title: "웹앱 URL", type: "url", description: "웹앱 주소만 입력합니다. APK 원본 주소는 저장하지 않습니다." }),
    defineField({ name: "storageKey", title: "Cloudflare R2 파일 키", type: "string" }),
    defineField({ name: "releaseNotes", title: "업데이트 내용", type: "localizedText" }),
    defineField({ name: "isLatest", title: "최신 버전", type: "boolean", initialValue: true }),
  ],
  preview: { select: { service: "service.displayName", platform: "platform", version: "version", visibility: "visibility" }, prepare: ({ service, platform, version, visibility }) => ({ title: `${service || "서비스 미지정"} · ${version || "버전 미지정"}`, subtitle: `${platform || "플랫폼 미지정"} · ${visibility || "공개 범위 미지정"}` }) },
});
