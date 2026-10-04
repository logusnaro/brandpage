import type { Product } from "@/sanity/lib/types";

// Founder-approved launch lineup. Published CMS records take precedence; explicit unpublishing hides an app.
// These defaults do not write to the shared CMS or change the existing deployed site.
export const launchCatalogue: Product[] = [
  {
    _id: "catalogue-daybybaby", name: "daybybaby", displayName: "DayByBaby",
    status: "published", sortOrder: 0,
    description: "A parenting journal for the little moments of your baby's day.",
    descriptionI18n: { ko: "아이의 하루를 가볍게 기록하고, 함께 자라는 순간을 간직해요.", en: "Log your baby's day and keep the moments of growing together." },
    categoryI18n: { ko: "육아 기록", en: "Parenting journal" },
    androidStatus: "planned", iosStatus: "planned",
  },
  {
    _id: "catalogue-memogrip", name: "memogrip", displayName: "MemoGrip",
    status: "published", sortOrder: 1,
    description: "Capture your thoughts and organize your notes.",
    descriptionI18n: { ko: "흘러가는 생각을 붙잡고, 흩어진 메모를 정리해요.", en: "Capture passing thoughts and bring scattered notes together." },
    categoryI18n: { ko: "메모 · 정리", en: "Notes & organization" },
    localImage: "/story/intro/intro-03-daughter-study-v2.webp",
    platforms: [],
  },
  {
    _id: "catalogue-goodgo", name: "goodgo", displayName: "GOODgo",
    status: "published", sortOrder: 2,
    description: "Plan when to get ready and leave, with what you need.",
    descriptionI18n: { ko: "준비부터 출발까지, 시간과 준비물을 챙겨요.", en: "From getting ready to heading out, keep time and essentials together." },
    categoryI18n: { ko: "외출 · 준비", en: "Getting ready" },
    localImage: "/story/intro/intro-01-father-morning-v2.webp",
    platforms: [],
  },
  {
    _id: "catalogue-bookbap", name: "bookbap", displayName: "BookBap",
    status: "published", sortOrder: 3,
    description: "Keep your books, reading and memorable passages together.",
    descriptionI18n: { ko: "읽은 책과 마음에 남은 문장을 나만의 기록으로 모아요.", en: "Keep your books and the passages that stay with you." },
    categoryI18n: { ko: "독서 · 기록", en: "Reading journal" },
    localImage: "/story/product/product-origin-v1.webp",
    platforms: [],
  },
];

// Founder decision, 2026-10-04: Android during 2026; iOS targeted for early 2027.
// Toss is a separate partial-feature mini-app initiative, not a promise for every app.
for (const product of launchCatalogue) {
  product.platforms = [
    { _key: "android", platform: "android", status: "planned", noteI18n: { ko: "2026년 출시 예정", en: "Planned for 2026" } },
    { _key: "ios", platform: "ios", status: "planned", noteI18n: { ko: "2027년 초 목표", en: "Targeting early 2027" } },
  ];
}

const aliases: Record<string, string> = {
  bebe: "daybybaby", daybybaby: "daybybaby",
  memo: "memogrip", allinmemo: "memogrip", memogrip: "memogrip",
  readygo: "goodgo", goodgo: "goodgo",
  innerbrary: "bookbap", bookbap: "bookbap",
};
const key = (product: Product) => aliases[(product.name || product.displayName).toLowerCase().replace(/[^a-z0-9]/g, "")] || product.name || product._id;

export function mergeLaunchCatalogue(records: Product[]) {
  const seen = new Set<string>();
  const result = launchCatalogue.flatMap((defaults) => {
    const match = records.find((item) => key(item) === defaults.name);
    if (match) {
      seen.add(match._id);
      if (match.status === "unpublished") return [];
    }
    // Do not expose old draft content (e.g. ALLinMEMO). Show only the newly approved public defaults.
    const published = match?.status === "published" ? match : undefined;
    const platforms = published?.platforms ?? (
      published?.googlePlayUrl || published?.appStoreUrl || published?.webUrl ? undefined : defaults.platforms
    );
    return [{ ...defaults, ...published, platforms }];
  });
  return [...result, ...records.filter((item) => item.status === "published" && !seen.has(item._id))];
}
