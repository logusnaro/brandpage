import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { getSanityAdminClient } from "@/lib/sanity-admin";

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as {
    serviceId?: string;
    platform?: string;
    version?: string;
    visibility?: "public" | "private" | "shared";
    storageKey?: string;
  };
  if (!body.serviceId || !body.version || !body.storageKey || body.platform !== "Android APK") {
    return NextResponse.json({ error: "필수 릴리스 정보가 없습니다." }, { status: 400 });
  }
  if (!(["public", "private", "shared"] as const).includes(body.visibility ?? "private")) {
    return NextResponse.json({ error: "공개 범위가 올바르지 않습니다." }, { status: 400 });
  }
  try {
    const client = getSanityAdminClient();
    const previousIds = await client.fetch<string[]>(
      `*[_type == "appRelease" && service._ref == $serviceId && platform == $platform && isLatest == true]._id`,
      { serviceId: body.serviceId, platform: body.platform },
    );
    const transaction = client.transaction();
    previousIds.forEach((id) => transaction.patch(id, { set: { isLatest: false } }));
    const releaseId = crypto.randomUUID();
    transaction.create({
      _id: body.visibility === "public" ? releaseId : `drafts.${releaseId}`,
      _type: "appRelease",
      service: { _type: "reference", _ref: body.serviceId },
      platform: body.platform,
      version: body.version.trim(),
      releaseDate: new Date().toISOString().slice(0, 10),
      visibility: body.visibility ?? "private",
      storageKey: body.storageKey,
      isLatest: true,
    });
    const result = await transaction.commit();
    return NextResponse.json({ transactionId: result.transactionId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "릴리스 저장 실패" }, { status: 503 });
  }
}
