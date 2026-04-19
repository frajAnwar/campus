import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from 'next-intl/middleware';

// 1. Setup the Internationalization Middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'fr', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

const publicPaths = ["/", "/login", "/signup"];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // 1. Handle Assets and APIs (Skip middleware)
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Check Auth Status
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  });
  const isLoggedIn = !!token;

  // 3. Check if the path is public
  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  // 4. Redirect logged-in users away from auth pages to dashboard
  if (isPublic && isLoggedIn && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 5. Redirect unauthenticated users to login
  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 6. If they passed auth, let next-intl handle the locale
  return intlMiddleware(req);
}

export const config = {
  // Matcher includes everything except specific folders
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/']
};
