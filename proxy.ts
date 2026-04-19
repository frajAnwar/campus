import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicPaths = ["/", "/login", "/signup"];

export default async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1. Skip API routes and assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Check if the path is public
  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  // 3. Get the JWT token to check auth status
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  });
  const isLoggedIn = !!token;

  // 4. Redirect logged-in users away from auth pages to dashboard
  if (isPublic && isLoggedIn && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 5. Redirect unauthenticated users to login
  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
