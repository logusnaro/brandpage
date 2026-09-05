import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const ADMIN_EMAIL = "logus.naro@gmail.com";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [Google],
  pages: { signIn: "/manage/login" },
  callbacks: {
    signIn({ profile }) {
      return profile?.email?.toLowerCase() === ADMIN_EMAIL;
    },
    authorized({ auth: session }) {
      return session?.user?.email?.toLowerCase() === ADMIN_EMAIL;
    },
  },
});
