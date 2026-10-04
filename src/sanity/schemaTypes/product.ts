import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Internal name",
      type: "slug",
      options: { source: "displayName", maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayName",
      title: "Display name",
      type: "string",
      description: "e.g. [:]bebe",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description (이전 데이터)",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayNameI18n",
      title: "제품 표시 이름 · 한국어/English",
      type: "localizedString",
      description: "비워두면 이전 Display name이 사용됩니다.",
    }),
    defineField({
      name: "categoryI18n",
      title: "제품 분류 · 한국어/English",
      type: "localizedString",
      description: "예: 육아 기록 / Parenting journal",
    }),
    defineField({
      name: "descriptionI18n",
      title: "제품 설명 · 한국어/English",
      type: "localizedText",
      description: "비워두면 이전 Description이 사용됩니다.",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: "status",
      title: "소개 공개 상태 (스토어 출시와 별도)",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Unpublished", value: "unpublished" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescriptionI18n",
      title: "목록용 한 줄 소개 · 한국어/English",
      type: "localizedString",
      description: "앱 목록에서 보일 짧은 설명. 비워두면 기존 설명이 사용됩니다.",
    }),
    defineField({
      name: "appIcon",
      title: "앱 아이콘",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "platforms",
      title: "이용 플랫폼 · 출시 상태",
      description: "앱별 Android/iOS/앱인토스/웹을 각각 추가하세요. 플랫폼마다 상태와 링크를 따로 관리합니다. 빈 목록은 기존 플랫폼 안내를 숨기며, 이 항목이 있으면 아래 이전 링크보다 우선합니다.",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({
            name: "platform", title: "플랫폼", type: "string",
            options: { list: [
              { title: "Android · Google Play", value: "android" },
              { title: "iOS · App Store", value: "ios" },
              { title: "앱인토스 · Apps in Toss", value: "toss" },
              { title: "웹 · Web", value: "web" },
            ] }, validation: (rule) => rule.required(),
          }),
          defineField({
            name: "status", title: "상태", type: "string", initialValue: "planned",
            options: { list: [
              { title: "준비 중", value: "planned" },
              { title: "이용 가능", value: "available" },
              { title: "표시하지 않음", value: "hidden" },
            ] }, validation: (rule) => rule.required(),
          }),
          defineField({
            name: "noteI18n", title: "제공 범위 / 일정 · 한국어/English", type: "localizedString",
            description: "예: 2026년 출시 예정 / 2027년 초 목표 / 일부 기능만 제공. 앱인토스 미니앱이면 제공 기능을 명시하세요.",
          }),
          defineField({
            name: "url", title: "스토어 / 서비스 접속 링크", type: "url",
            description: "이용 가능 상태에는 실제 HTTPS 링크가 필요합니다. 앱인토스는 공유용 HTTPS 링크를 넣으세요.",
            validation: (rule) => rule.uri({ scheme: ["https"] }).custom((value, context) =>
              (context.parent as { status?: string })?.status !== "available" || Boolean(value) || "이용 가능한 플랫폼의 링크를 입력하세요."),
          }),
        ],
        preview: { select: { title: "platform", subtitle: "status" } },
      }],
      validation: (rule) => rule.custom((value) => {
        const entries = value as Array<{ platform?: string }> | undefined;
        const platforms = entries?.map((item) => item.platform).filter(Boolean) || [];
        return new Set(platforms).size === platforms.length || "같은 플랫폼은 한 번만 추가하세요.";
      }),
    }),
    defineField({
      name: "googlePlayUrl",
      title: "Google Play URL (Android)",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "androidStatus",
      title: "Android 출시 상태",
      type: "string",
      options: { list: [
        { title: "준비 중", value: "planned" },
        { title: "이용 가능 (링크 필수)", value: "available" },
        { title: "표시하지 않음", value: "none" },
      ] },
      validation: (rule) => rule.custom((value, context) =>
        value !== "available" || Boolean(context.document?.googlePlayUrl) || "Google Play 링크를 입력하세요."),
    }),
    defineField({
      name: "iosStatus",
      title: "iOS 출시 상태",
      type: "string",
      options: { list: [
        { title: "준비 중", value: "planned" },
        { title: "이용 가능 (링크 필수)", value: "available" },
        { title: "표시하지 않음", value: "none" },
      ] },
      validation: (rule) => rule.custom((value, context) =>
        value !== "available" || Boolean(context.document?.appStoreUrl) || "App Store 링크를 입력하세요."),
    }),
    defineField({
      name: "appStoreUrl",
      title: "App Store URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "webUrl",
      title: "Web URL",
      type: "url",
    }),
    defineField({
      name: "homeScreen",
      title: "Home screen (grid thumbnail)",
      type: "image",
      description: "Shown on the products grid. Prefer the app home screen.",
      options: { hotspot: true },
    }),
    defineField({
      name: "mascotImage",
      title: "서비스 logU 이미지",
      type: "image",
      description: "제품 소개에 보이는 캐릭터 이미지입니다. 배경이 투명한 파일을 권장합니다.",
      options: { hotspot: true },
    }),
    defineField({
      name: "highlights",
      title: "서비스 특징 · 한국어/English",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "특징", type: "localizedString" }),
          defineField({ name: "description", title: "특징 설명 · 한국어/English", type: "localizedText" }),
        ],
        preview: { select: { title: "label.ko", subtitle: "label.en" } },
      }],
    }),
    defineField({
      name: "videos",
      title: "서비스 영상",
      description: "목록 순서대로 표시합니다. MP4 경로 또는 YouTube 링크를 넣으세요. 빈 목록으로 저장하면 영상을 숨길 수 있습니다.",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "titleI18n", title: "영상 이름 · 한국어/English", type: "localizedString" }),
          defineField({
            name: "url",
            title: "MP4 경로 또는 YouTube 링크",
            type: "string",
            validation: (rule) => rule.required().custom((value) => {
              if (typeof value !== "string") return true;
              if (/^\/[a-z0-9/_\-.]+$/i.test(value)) return true;
              try { return new URL(value).protocol === "https:" || "HTTPS 링크 또는 /로 시작하는 경로를 입력하세요."; }
              catch { return "HTTPS 링크 또는 /로 시작하는 경로를 입력하세요."; }
            }),
          }),
          defineField({
            name: "aspect",
            title: "화면 비율",
            type: "string",
            options: { list: [{ title: "가로", value: "landscape" }, { title: "세로", value: "portrait" }] },
            initialValue: "landscape",
          }),
          defineField({ name: "duration", title: "길이 표시 (예: 0:20)", type: "string" }),
          defineField({ name: "poster", title: "미리보기 이미지", type: "image", options: { hotspot: true } }),
        ],
        preview: { select: { title: "titleI18n.ko", subtitle: "duration", media: "poster" } },
      }],
    }),
    defineField({
      name: "screenshots",
      title: "Screenshots (popup gallery)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
            }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),
    // Legacy single screenshot — kept so old docs still open in Studio
    defineField({
      name: "screenshot",
      title: "Screenshot (legacy)",
      type: "image",
      hidden: true,
      options: { hotspot: true },
    }),
    defineField({
      name: "screenshotAlt",
      title: "Screenshot alt text (legacy)",
      type: "string",
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "displayName",
      status: "status",
      media: "homeScreen",
    },
    prepare: ({ title, status, media }) => ({
      title: title || "Untitled product",
      subtitle: status,
      media,
    }),
  },
});
