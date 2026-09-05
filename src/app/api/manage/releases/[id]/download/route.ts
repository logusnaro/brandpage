import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createDownloadUrl } from "@/lib/r2";
import { getSanityAdminClient } from "@/lib/sanity-admin";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  try {
    const release = await getSanityAdminClient().fetch<{ storageKey?: string; version?: string } | null>(
      `*[_type == "appRelease" && _id == $id][0]{ storageKey, version }`, { id },
    );
    if (!release?.storageKey) return NextResponse.json({ error: "파일을 찾을 수 없습니다." }, { status: 404 });
    const url = await createDownloadUrl(release.storageKey, `logus-${release.version || "release"}.apk`);
    return NextResponse.redirect(url);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "다운로드 실패" }, { status: 503 });
  }
}
