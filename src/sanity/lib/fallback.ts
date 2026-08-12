import type { PageData } from "./types";

/** Seed used until Sanity has published content. */
export const fallbackPageData: PageData = {
  source: "fallback",
  settings: {
    hero: {
      tagline: "The little things become your story.",
      subline: "",
    },
    philosophy:
      "We don't build products\nto make people do more.\n\nWe build products\nthat help people remember more.\n\nBecause every little moment\ndeserves to be remembered.",
    studio:
      "We are logUs Studio.\nWe build small\ndigital products\nfor everyday life.\n\nSimple.\nUseful.\nMade to last.",
    contact: {
      headline: "log little moments. with Us.",
      email: "logus.naro@gmail.com",
    },
  },
  products: [
    {
      _id: "fallback-bebe",
      name: "bebe",
      displayName: "[:] bebe",
      description:
        "A little app for remembering\nyour baby's everyday moments.",
      status: "published",
      sortOrder: 0,
    },
  ],
  socialLinks: [
    {
      _id: "fallback-threads",
      platform: "threads",
      url: "https://www.threads.com/@logus.naro",
      status: "published",
      sortOrder: 0,
    },
  ],
};
