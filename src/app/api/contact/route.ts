import { NextResponse } from "next/server";
import { getSanityAdminClient } from "@/lib/sanity-admin";

function value(input: unknown, max: number) {
  return typeof input === "string" ? input.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body = await request.json() as Record<string, unknown>;
  if (value(body.website, 200)) return NextResponse.json({ ok: true });
  const inquiryType = value(body.inquiryType, 80);
  const name = value(body.name, 100);
  const email = value(body.email, 254).toLowerCase();
  const message = value(body.message, 5000);
  const locale = body.locale === "en" ? "en" : "ko";
  if (!inquiryType || !name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 2) {
    return NextResponse.json({ error: "문의 내용을 확인해주세요." }, { status: 400 });
  }
  try {
    await getSanityAdminClient().create({
      _type: "contactSubmission",
      inquiryType,
      name,
      email,
      message,
      locale,
      receivedAt: new Date().toISOString(),
      status: "new",
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "문의 저장에 실패했습니다." }, { status: 503 });
  }
}
