import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    hero{ tagline, subline },
    philosophy,
    studio,
    contact{ headline, email }
  }
`;

export const productsQuery = groq`
  *[_type == "product" && status == "published"] | order(sortOrder asc) {
    _id,
    "name": name.current,
    displayName,
    description,
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
