import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("AUTH_SECRET이 설정되지 않았습니다.");
  return value;
}

export function signReleaseShare(id: string, expires: number) {
  return createHmac("sha256", secret()).update(`${id}.${expires}`).digest("base64url");
}

export function verifyReleaseShare(id: string, expires: number, signature: string) {
  if (!Number.isSafeInteger(expires) || expires <= Date.now()) return false;
  const expected = Buffer.from(signReleaseShare(id, expires));
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}
