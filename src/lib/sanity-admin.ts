import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export function getSanityAdminClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) throw new Error("SANITY_API_WRITE_TOKEN이 설정되지 않았습니다.");
  return createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });
}

export type AdminRelease = {
  _id: string;
  serviceName: string;
  platform: string;
  version: string;
  releaseDate?: string;
  visibility: "public" | "private" | "shared";
  storageKey?: string;
  downloadUrl?: string;
  isLatest?: boolean;
};

export async function getAdminOverview() {
  const client = getSanityAdminClient();
  return client.fetch<{
    services: Array<{ _id: string; name: string }>;
    releases: AdminRelease[];
    legalCount: number;
    mascotCount: number;
  }>(`{
    "services": *[_type == "product"] | order(sortOrder asc){ _id, "name": coalesce(displayNameI18n.ko, displayName) },
    "releases": *[_type == "appRelease"] | order(releaseDate desc, _createdAt desc){ _id, "serviceName": service->displayName, platform, version, releaseDate, visibility, storageKey, downloadUrl, isLatest },
    "legalCount": count(*[_type == "legalDocument"]),
    "mascotCount": count(*[_type == "mascot"])
  }`);
}
