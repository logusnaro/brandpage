import { NextResponse } from "next/server";
import { createDownloadUrl } from "@/lib/r2";
import { getSanityAdminClient } from "@/lib/sanity-admin";
import { verifyReleaseShare } from "@/lib/share-token";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const url = new URL(request.url);
  const expires = Number(url.searchParams.get("expires"));
  const signature = url.searchParams.get("signature") || "";
  if (!verifyReleaseShare(id, expires, signature)) return NextResponse.json({ error: "링크가 만료되었거나 올바르지 않습니다." }, { status: 403 });
  const release = await getSanityAdminClient().fetch<{ visibility?: string; storageKey?: string; version?: string } | null>(
    `*[_type == "appRelease" && _id in [$id, "drafts." + $id]][0]{ visibility, storageKey, version }`, { id },
  );
  if (!release?.storageKey || release.visibility !== "shared") return NextResponse.json({ error: "파일을 찾을 수 없습니다." }, { status: 404 });
  return NextResponse.redirect(await createDownloadUrl(release.storageKey, `logus-${release.version || "release"}.apk`));
}
