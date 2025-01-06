import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api/send-otp") ||
    pathname.startsWith("/api/reset-password")
  ) {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  const token = await getToken({ req, secret });

  if (
    token &&
    token.role === "user" &&
    (pathname === "/signup" || pathname === "/login")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (token && token.role === "admin" && pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/dashboard/:path*",
    "/admin/login",
    "/login",
    "/signup",
  ],
};
