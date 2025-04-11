import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Bypass for Next.js internals & public assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users away from protected routes
  if (
    !token &&
    (pathname.startsWith("/app") ||
      pathname.startsWith("/onboarding") ||
      pathname.startsWith("/patient") ||
      pathname.startsWith("/physio"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect authenticated users away from root to their proper route
  if (token && pathname === "/") {
    return NextResponse.redirect(
      new URL(
        token.isOnboarded
          ? token.role === "patient"
            ? "/patient"
            : "/physio"
          : "/onboarding",
        request.url
      )
    );
  }

  // Prevent onboarded users from accessing onboarding again
  if (token && pathname.startsWith("/onboarding") && token.isOnboarded) {
    return NextResponse.redirect(
      new URL(token.role === "physio" ? "/physio" : "patient", request.url)
    );
  }

  // Prevent non-onboarded users from accessing /app
  if (
    token &&
    (pathname.startsWith("/patient") || pathname.startsWith("/physio")) &&
    !token.isOnboarded
  ) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  // Prevent Patient from accessing therapist
  if (
    token &&
    token.isOnboarded &&
    token.role === "patient" &&
    pathname.startsWith("/physio")
  ) {
    return NextResponse.redirect(new URL("/patient", request.url));
  }

  // Prevent therapist from accessing patient
  if (
    token &&
    token.isOnboarded &&
    token.role === "physio" &&
    pathname.startsWith("/patient")
  ) {
    return NextResponse.redirect(new URL("/physio", request.url));
  }
  return NextResponse.next();
}
