import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Redirect non-www to www (canonical is www.slowmorocco.com)
  if (hostname === "slowmorocco.com") {
    const newUrl = new URL(request.url);
    newUrl.host = "www.slowmorocco.com";
    return NextResponse.redirect(newUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
