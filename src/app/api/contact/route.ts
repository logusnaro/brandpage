import { NextResponse } from "next/server";
import { getSanityAdminClient } from "@/lib/sanity-admin";
import { randomUUID } from "node:crypto";
import { CONTACT_NOTICE_VERSION } from "@/lib/contactPrivacy";

function value(input: unknown, max: number) {
  return typeof input === "string" ? input.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const input: unknown = await request.json();
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid body");
    body = input as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "문의 내용을 확인해주세요." }, { status: 400 });
  }
  if (value(body.website, 200)) return NextResponse.json({ ok: true });
  const inquiryType = value(body.inquiryType, 80);
  const name = value(body.name, 100);
  const email = value(body.email, 254).toLowerCase();
  const message = value(body.message, 5000);
  const locale = body.locale === "en" ? "en" : "ko";
  if (body.privacyConsent !== true || body.overseasConsent !== true || body.noticeVersion !== CONTACT_NOTICE_VERSION) {
    return NextResponse.json({ error: locale === "en" ? "Please review the privacy notice and give consent." : "개인정보 수집·이용 안내를 확인하고 동의해주세요." }, { status: 400 });
  }
  if (!inquiryType || !name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 2) {
    return NextResponse.json({ error: "문의 내용을 확인해주세요." }, { status: 400 });
  }
  try {
    await getSanityAdminClient().create({
      // Sanity public datasets expose root IDs. Subpath IDs require authentication.
      _id: `private.contacts.${randomUUID()}`,
      _type: "contactSubmission",
      inquiryType,
      name,
      email,
      message,
      locale,
      receivedAt: new Date().toISOString(),
      privacyConsent: true,
      overseasConsent: true,
      consentedAt: new Date().toISOString(),
      noticeVersion: CONTACT_NOTICE_VERSION,
      status: "new",
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "문의 저장에 실패했습니다." }, { status: 503 });
  }
}
