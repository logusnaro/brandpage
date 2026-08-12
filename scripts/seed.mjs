/**
 * Seed Sanity with Phase 1 content from docs/PLANNING.md
 *
 * Usage:
 *   set SANITY_API_WRITE_TOKEN=...
 *   npm run seed
 */
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "7wq3nq5m";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  hero: {
    tagline: "The little becomes your story.",
    subline: "",
  },
  philosophy:
    "We don't build products\nto make people do more.\n\nWe build products\nthat help people remember more.",
  studio: "We are logUs Studio.\nWe build small digital products for everyday life.",
  contact: {
    headline: "The little becomes your story.",
    email: "logus.naro@gmail.com",
  },
};

const bebe = {
  _id: "product-bebe",
  _type: "product",
  name: { _type: "slug", current: "bebe" },
  displayName: "[:] bebe",
  description:
    "A little app for remembering\nyour baby's everyday moments.",
  status: "published",
  sortOrder: 0,
};

const threads = {
  _id: "social-threads",
  _type: "socialLink",
  platform: "threads",
  url: "https://www.threads.com/@logus.naro",
  status: "published",
  sortOrder: 0,
};

const tx = client.transaction();
tx.createOrReplace(siteSettings);
tx.createOrReplace(bebe);
tx.createOrReplace(threads);

await tx.commit();
console.log("Seeded siteSettings, [:]bebe, Threads →", { projectId, dataset });
