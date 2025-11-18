import supabase from "@/lib/supabaseClient";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        console.log("Credentials received:", credentials);

        // 1) Look up the user in Supabase
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

        console.log("Supabase user found:", user);
        console.log("Supabase error:", error);

        if (!user) {
          console.log("No user found");
          return null;
        }

        // 2) Password check (simple text match for now)
        if (user.password !== password) {
          console.log("Password incorrect");
          return null;
        }

        console.log("Login successful");

        // 3) Pass full user back into NextAuth
        return {
          id: user.user_id,       
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url || null,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  // CALLBACKS WITH USER ID
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;                   
        token.name = user.name;
        token.email = user.email;
        token.avatar_url = user.avatar_url;
      }
      return token;
    },

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
