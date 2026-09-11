import "server-only";
import { createDecipheriv, createHash } from "node:crypto";
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

export async function getOperationsDashboard() {
  const snapshot = await getSanityAdminClient().fetch<{ generatedAt?: string; payload?: string } | null>(
    `*[_id == "operations-dashboard"][0]{generatedAt, payload}`,
  );
  if (!snapshot?.payload) throw new Error("운영 대시보드 데이터가 없습니다. dashboard:sync를 실행하세요.");
  const secret = process.env.SANITY_API_WRITE_TOKEN;
  if (!secret) throw new Error("운영 데이터 암호화 키가 설정되지 않았습니다.");
  const encrypted = JSON.parse(snapshot.payload) as { iv: string; tag: string; data: string };
  const decipher = createDecipheriv("aes-256-gcm", createHash("sha256").update(secret).digest(), Buffer.from(encrypted.iv, "base64"));
  decipher.setAuthTag(Buffer.from(encrypted.tag, "base64"));
  const plain = Buffer.concat([decipher.update(Buffer.from(encrypted.data, "base64")), decipher.final()]).toString("utf8");
  return JSON.parse(plain) as OperationsDashboardData;
}

export type OperationsDashboardData = {
  generatedAt: string;
  summary?: Record<string, number>;
  projects: Array<{
    id: string; name: string; pathHint?: string; status?: string; stage?: string; nextAction?: string;
    updatedAt?: string; idleDays?: number; git?: { isRepository?: boolean; origin?: string; changedFiles?: number };
    verification?: { status?: string; qualityRecords?: number }; issues?: string[];
  }>;
  folderTree?: unknown[];
};
