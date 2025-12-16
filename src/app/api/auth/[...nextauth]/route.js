import supabase from "@/lib/supabaseClient";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Normalize input
        const email = credentials.email.toLowerCase();
        const password = credentials.password;

        // Fetch user from Supabase
        const { data: user, error } = await supabase
          .from("users")
          .select("user_id, name, email, password, avatar_url")
          .eq("email", email)
          .single();

        if (error || !user) {
          console.error("Authentication error:", error);
          return null;
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(
          password,
          user.password
        );

        if (!isValidPassword) {
          return null;
        }

        //  Return user object (triggers session + cookie creation)
        return {
          id: user.user_id,
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url ?? null,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  // JWT-based session stored in secure HTTP-only cookie
  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Runs whenever a JWT is created or updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.avatar_url = user.avatar_url;
      }
      return token;
    },

    // Expose custom fields to the client session
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.avatar_url = token.avatar_url;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
