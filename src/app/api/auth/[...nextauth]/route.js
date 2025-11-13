import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth ({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email:{labale: "Email", type: "email"},
                password: {lable: "Password", type: "password"},
            },
            async authorize(credentials){
                const {email, password} = credentials;

                //must be replaced with our real database:
                if(email === "test@example.com" && password === "123456"){
                    return{ id: 1, name: "Test User", email: "test@example.com"};
                }
                // if there is nothing matched the login will fail
                return null;
            },
        }),
    ],

    pages: {
        signIn: "/login",
    },

    sessions: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export {handler as GET, handler as POST};