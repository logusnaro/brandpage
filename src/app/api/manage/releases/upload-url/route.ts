import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createUploadUrl } from "@/lib/r2";

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as { fileName?: string; contentType?: string };
  const fileName = body.fileName?.trim();
  if (!fileName || !fileName.toLowerCase().endsWith(".apk")) {
    return NextResponse.json({ error: "APK 파일만 업로드할 수 있습니다." }, { status: 400 });
  }
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
  const key = `releases/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;
  try {
    const uploadUrl = await createUploadUrl(key, body.contentType || "application/vnd.android.package-archive");
    return NextResponse.json({ key, uploadUrl });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "업로드 주소 생성 실패" }, { status: 503 });
  }
}
