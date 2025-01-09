import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.role
        ) {
          throw new Error("Email, password, and role are required!");
        }

        try {
          const { email, password, role } = credentials;

          if (role === "admin") {
            const admin = await prisma.Admin.findUnique({
              where: { email },
            });

            if (!admin) {
              throw new Error("No admin found with this email!");
            }

            const passwordCorrect = await bcrypt.compare(
              password,
              admin.password
            );
            if (passwordCorrect) {
              return { id: admin.id, email: admin.email, role: "admin" };
            } else {
              throw new Error("Incorrect credentials!");
            }
          } else if (role === "user") {
            const user = await prisma.Team.findUnique({
              where: { email },
            });

            if (!user) {
              throw new Error("No user found with this email!");
            }

            const passwordCorrect = await bcrypt.compare(
              password,
              user.password
            );
            if (passwordCorrect) {
              // console.log("User found:", user.teamName);
              return { id: user.id, email: user.email, role: "user", teamName: user.teamName };
            } else {
              throw new Error("Incorrect credentials!");
            }
          }
          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.teamName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          role: token.role,
          name: token.name,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
