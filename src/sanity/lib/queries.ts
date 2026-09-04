import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    pageLabels,
    navigation,
    language,
    introScenes[]{ _key, symbol, title, body, visual },
    dailyEyebrow,
    dailyTitle,
    dailyBody,
    dailyCta,
    dailyJourneyLabel,
    dailyScenes[]{ _key, time, title, copy, visual },
    dailyClosingTitle,
    dailyClosingBody,
    productsEyebrow,
    productsTitle,
    productsBody,
    productsTransitionTitle,
    productsTransitionBody,
    productsComingSoon,
    productsVisit,
    productsGuide,
    productsLead,
    productsSupport,
    lifeEyebrow,
    lifeTitle,
    lifeBody,
    lifeStages[]{ _key, age, title, copy, visual },
    lifeClosingTitle,
    lifeClosingBody,
    contactEyebrow,
    contactLabel,
    contactTitle,
    contactBody,
    contactEmail,
    contactLocation,
    copyright,
    metaTitle,
    metaDescription,
    hero,
    philosophy,
    studio,
    contact
  }
`;

export const productsQuery = groq`
  *[_type == "product" && status == "published"] | order(sortOrder asc) {
    _id,
    "name": name.current,
    displayName,
    description,
    displayNameI18n,
    descriptionI18n,
    categoryI18n,
    sortOrder,
    status,
    appStoreUrl,
    webUrl,
    homeScreen,
    screenshots[]{ ..., alt },
    screenshot,
    screenshotAlt
  }
`;

export const socialLinksQuery = groq`
  *[_type == "socialLink" && status == "published" && defined(url)] | order(sortOrder asc) {
    _id,
    platform,
    label,
    url,
    sortOrder,
    status
  }
`;
