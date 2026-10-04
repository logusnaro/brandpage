import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    cinema,
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
  *[_type == "product"] | order(sortOrder asc) {
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
    googlePlayUrl,
    androidStatus,
    iosStatus,
    shortDescriptionI18n,
    appIcon,
    platforms[]{ _key, platform, status, url, noteI18n },
    webUrl,
    homeScreen,
    mascotImage,
    detail,
    highlights[]{ _key, label, description, image },
    videos[]{ _key, titleI18n, url, aspect, duration, poster },
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
