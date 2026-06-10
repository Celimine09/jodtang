import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const hasToken = accessToken || refreshToken;
  const { pathname } = request.nextUrl;

  if (
    !hasToken &&
    (pathname.startsWith("/budgets") ||
      pathname.startsWith("/transactions") ||
      pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (hasToken && pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/budgets", "/transactions", "/auth"],
};
