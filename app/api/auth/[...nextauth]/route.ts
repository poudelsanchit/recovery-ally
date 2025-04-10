import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      await dbConnect();
      const existingUser = await UserModel.findOne({ email: user.email });
      if (!existingUser) {
        try {
          const newUser = new UserModel({
            name: user.name,
            email: user.email,
            image: user.image,
            isOnboarded: false, // You can set this to `false` by default if needed
          });

          await newUser.save();
          console.log("New user created:", newUser);
        } catch (error) {
          console.error("Error creating new user:", error);
        }
      }
      return existingUser?.isOnboarded ? "/app" : "/onboarding";
    },
  },
});

export { handler as GET, handler as POST };
