import { NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { createDownloadUrl } from "@/lib/r2";

export async function GET(_request: Request, context: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await context.params;
  const release = await client.fetch<{ platform?: string; storageKey?: string; downloadUrl?: string; version?: string } | null>(
    `*[_type == "appRelease" && service._ref == $serviceId && visibility == "public" && isLatest == true] | order(releaseDate desc, _createdAt desc)[0]{ platform, storageKey, downloadUrl, version }`,
    { serviceId },
  );
  if (!release) return NextResponse.json({ error: "공개된 최신 버전이 없습니다." }, { status: 404 });
  if (release.platform === "Web app" && release.downloadUrl) return NextResponse.redirect(release.downloadUrl);
  if (!release.storageKey) return NextResponse.json({ error: "다운로드 파일이 없습니다." }, { status: 404 });
  return NextResponse.redirect(await createDownloadUrl(release.storageKey, `logus-${release.version || "latest"}.apk`));
}
