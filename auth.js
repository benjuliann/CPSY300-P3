import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,

  session: {
    strategy: "jwt",
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.provider = account.provider;
      }

      if (profile) {
        if (account?.provider === "github") {
          token.username = profile.login;
        }

        token.name = profile.name || token.name;
        token.email = profile.email || token.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.provider = token.provider;
        session.user.username = token.username;
      }

      return session;
    },
  },

  pages: {
    signIn: "/",
  },

  secret: process.env.AUTH_SECRET,
});