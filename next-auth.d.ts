// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;  // Add accessToken to session
    userId?: string;  // Optional userId, if you plan to add it
  }

  interface JWT {
    accessToken?: string;  // Add accessToken to JWT
    userId?: string;  // Optional userId
  }
}
