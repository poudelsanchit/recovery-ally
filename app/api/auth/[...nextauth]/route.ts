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
            isOnboarded: false,
          });
          await newUser.save();
          console.log("New user created:", newUser);
        } catch (error) {
          console.error("Error creating new user:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // Fetch fresh user data from database on every JWT update
      await dbConnect();
      const dbUser = await UserModel.findOne({ email: token.email });

      if (dbUser) {
        if (dbUser?._id) {
          token.userId = dbUser._id.toString(); // ✅ Add this
        }
        token.isOnboarded = dbUser.isOnboarded;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.userId = token.userId; // ✅ Add this
        session.user.isOnboarded = token.isOnboarded;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
