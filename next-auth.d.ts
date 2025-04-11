// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    isOnboarded?: boolean;
    userId?: string;
  }

  interface Session {
    accessToken?: string; // Add accessToken to session
    userId?: string; // Optional userId, if you plan to add it
    user?: User & {
      userId?: string;
      isOnboarded?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string; // Add accessToken to JWT
    userId?: string; // Optional userId
    isOnboarded?: boolean;
  }
}
