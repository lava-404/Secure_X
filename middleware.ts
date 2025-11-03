import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard specific routes
  const isProtected = pathname.startsWith("/generator") || pathname.startsWith("/dashboard");
  if (!isProtected) return NextResponse.next();

  // Read auth cookie set by /api/auth
  const authCookie = req.cookies.get("auth")?.value;
  if (authCookie) return NextResponse.next();

  // Redirect unauthenticated users to /auth and preserve return path
  const url = req.nextUrl.clone();
  url.pathname = "/auth";
  url.searchParams.set("redirect", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/generator",
    "/generator/:path*",
    "/dashboard",
    "/dashboard/:path*",
  ],
};


