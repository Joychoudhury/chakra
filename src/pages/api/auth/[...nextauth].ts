import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/lib/model/user";
import { ensureDbConnected } from "@/lib/db";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google client ID or secret is missing");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      async profile(profile: GoogleProfile) {
        // Create or fetch the user and return a User object
        const { sub, email, name } = profile;
        await ensureDbConnected();
        
        let user = await User.findOne({ email });

        if (!user) {
          user = new User({
            email,
            name,
            role: "user",
          });
          await user.save();
        }

        return {
          id: sub,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await ensureDbConnected();
        if (!credentials) return null;

        const { email, password } = credentials;
        const isUser = await User.findOne({ email });

        if (isUser.password === password) {
          return {
            id: isUser._id,
            email: isUser.email,
            name: isUser.name,
            role: isUser.role,
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      await ensureDbConnected();

      if (account && account.provider === "google") {
        const { name, email } = user;
        const isUser = await User.findOne({ email });

        if (isUser === null) {
          const newUser = new User({
            email: email,
            name: name,
            role: "user",
          });
          await newUser.save();
        }
        return true;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) { 
      if (token.role !== undefined) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
