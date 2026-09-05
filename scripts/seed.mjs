/**
 * Fill only missing CMS fields with the website defaults.
 * Existing admin edits, uploaded screenshots, and publish states are preserved.
 */
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "7wq3nq5m";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const fallbackSource = await readFile(
  new URL("../src/sanity/lib/fallback.ts", import.meta.url),
  "utf8",
);
const fallbackJavaScript = ts.transpileModule(fallbackSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const fallbackModule = await import(
  `data:text/javascript;base64,${Buffer.from(fallbackJavaScript).toString("base64")}`
);
const settings = fallbackModule.fallbackSiteSettings;

const short = (value) => ({ _type: "localizedString", ...value });
const long = (value) => ({ _type: "localizedText", ...value });

const siteFields = {
  pageLabels: {
    _type: "object",
    intro: short(settings.pageLabels.intro),
    product: short(settings.pageLabels.product),
    contact: short(settings.pageLabels.contact),
  },
  navigation: {
    _type: "object",
    daily: short(settings.navigation.daily),
    products: short(settings.navigation.products),
    life: short(settings.navigation.life),
  },
  language: { _type: "object", ...settings.language },
  introScenes: settings.intro.scenes.map((scene) => ({
    _type: "introScene",
    ...scene,
    title: short(scene.title),
    body: long(scene.body),
  })),
  dailyEyebrow: short(settings.daily.eyebrow),
  dailyTitle: long(settings.daily.title),
  dailyBody: long(settings.daily.body),
  dailyCta: short(settings.daily.cta),
  dailyJourneyLabel: short(settings.daily.journeyLabel),
  dailyScenes: settings.daily.scenes.map((scene) => ({
    _type: "dailyScene",
    ...scene,
    title: short(scene.title),
    copy: long(scene.copy),
  })),
  dailyClosingTitle: long(settings.daily.closingTitle),
  dailyClosingBody: long(settings.daily.closingBody),
  productsEyebrow: short(settings.products.eyebrow),
  productsTitle: long(settings.products.title),
  productsBody: long(settings.products.body),
  productsTransitionTitle: long(settings.products.transitionTitle),
  productsTransitionBody: long(settings.products.transitionBody),
  productsComingSoon: short(settings.products.comingSoon),
  productsVisit: short(settings.products.visitProduct),
  productsGuide: long(settings.products.guide),
  productsLead: short(settings.products.lead),
  productsSupport: long(settings.products.support),
  lifeEyebrow: short(settings.life.eyebrow),
  lifeTitle: long(settings.life.title),
  lifeBody: long(settings.life.body),
  lifeStages: settings.life.stages.map((stage) => ({
    _type: "lifeStage",
    ...stage,
    age: short(stage.age),
    title: short(stage.title),
    copy: long(stage.copy),
  })),
  lifeClosingTitle: long(settings.life.closingTitle),
  lifeClosingBody: long(settings.life.closingBody),
  contactEyebrow: short(settings.contact.eyebrow),
  contactLabel: short(settings.contact.label),
  contactTitle: long(settings.contact.title),
  contactBody: long(settings.contact.body),
  contactEmail: settings.contact.email,
  contactLocation: short(settings.contact.location),
  copyright: short(settings.contact.copyright),
  metaTitle: short(settings.metadata.title),
  metaDescription: long(settings.metadata.description),
};

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  token,
  useCdn: false,
});

const tx = client.transaction();
tx.createIfNotExists({ _id: "siteSettings", _type: "siteSettings" });
tx.patch("siteSettings", (patch) => patch.setIfMissing(siteFields));

tx.createIfNotExists({
  _id: "product-bebe",
  _type: "product",
  name: { _type: "slug", current: "daybybaby" },
  displayName: "DayByBaby",
  description: "A little app for remembering your baby's everyday moments.",
  status: "published",
  sortOrder: 0,
});
tx.patch("product-bebe", (patch) =>
  patch.setIfMissing({
    displayNameI18n: short({ ko: "DayByBaby", en: "DayByBaby" }),
    categoryI18n: short({ ko: "육아 기록", en: "Parenting journal" }),
    descriptionI18n: long({
      ko: "아이와 함께한 평범한 하루가 사라지지 않도록 돕는 육아 기록 앱입니다.",
      en: "A gentle parenting journal for keeping the ordinary days with your child.",
    }),
  }),
);

tx.createIfNotExists({
  _id: "social-threads",
  _type: "socialLink",
  platform: "threads",
  url: "https://www.threads.com/@logus.naro",
  status: "published",
  sortOrder: 0,
});

await tx.commit();
console.log("Filled missing bilingual website fields without overwriting existing content.");
