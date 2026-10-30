import NextAuth from "next-auth";

export const { signOut, signIn, auth, handlers } = NextAuth({
  providers: [],

  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
