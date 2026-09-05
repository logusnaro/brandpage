import "server-only";
import { auth, ADMIN_EMAIL } from "@/auth";

export async function requireAdmin() {
  if (!hasAdminConfiguration()) return null;
  const session = await auth();
  if (session?.user?.email?.toLowerCase() !== ADMIN_EMAIL) return null;
  return session;
}

export function hasAdminConfiguration() {
  return Boolean(
    process.env.AUTH_SECRET &&
    process.env.AUTH_GOOGLE_ID &&
    process.env.AUTH_GOOGLE_SECRET,
  );
}
