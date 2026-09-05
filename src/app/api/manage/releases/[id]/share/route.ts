import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getSanityAdminClient } from "@/lib/sanity-admin";
import { signReleaseShare } from "@/lib/share-token";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const release = await getSanityAdminClient().fetch<{ visibility?: string; storageKey?: string } | null>(
    `*[_type == "appRelease" && _id in [$id, "drafts." + $id]][0]{ visibility, storageKey }`, { id: id.replace(/^drafts\./, "") },
  );
  if (!release?.storageKey || release.visibility !== "shared") {
    return NextResponse.json({ error: "공유 링크용 릴리스가 아닙니다." }, { status: 400 });
  }
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const signature = signReleaseShare(id.replace(/^drafts\./, ""), expires);
  const origin = new URL(request.url).origin;
  return NextResponse.json({ url: `${origin}/api/releases/shared/${encodeURIComponent(id.replace(/^drafts\./, ""))}?expires=${expires}&signature=${signature}`, expires });
}
