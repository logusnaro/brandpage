import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createUploadUrl, getR2UsageBytes, R2_STORAGE_LIMIT_BYTES } from "@/lib/r2";

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as { fileName?: string; contentType?: string; fileSize?: number };
  const fileName = body.fileName?.trim();
  const fileSize = Number(body.fileSize);
  if (!fileName || !fileName.toLowerCase().endsWith(".apk") || !Number.isSafeInteger(fileSize) || fileSize <= 0) {
    return NextResponse.json({ error: "APK 파일만 업로드할 수 있습니다." }, { status: 400 });
  }
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
  const key = `releases/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;
  try {
    const usageBytes = await getR2UsageBytes();
    if (usageBytes + fileSize > R2_STORAGE_LIMIT_BYTES) {
      return NextResponse.json({ error: "R2 저장량이 9GB 제한을 넘습니다. 이전 APK를 정리한 뒤 다시 시도해주세요.", usageBytes, limitBytes: R2_STORAGE_LIMIT_BYTES }, { status: 413 });
    }
    const uploadUrl = await createUploadUrl(key, body.contentType || "application/vnd.android.package-archive", fileSize);
    return NextResponse.json({ key, uploadUrl, usageBytes, limitBytes: R2_STORAGE_LIMIT_BYTES });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "업로드 주소 생성 실패" }, { status: 503 });
  }
}
