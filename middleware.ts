import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/auth", "/auth/login", "/auth/register"];
  const isPublicRoute = publicRoutes.some(route => pathname === route);

  const refreshToken = request.cookies.get("refreshToken")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!refreshToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (refreshToken && !isPublicRoute && !accessToken) {
    const newTokens = await fetch(
      `${request.nextUrl.origin}/api/refresh?refreshToken=${refreshToken}`,
    );

    const data = await newTokens.json();

    if (data) {
      const response = NextResponse.next();
      response.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      if (data.accessToken) {
        response.cookies.set("accessToken", data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }
      return response;
    }

    const response = NextResponse.redirect(
      new URL("/auth/register", request.url),
    );
    response.cookies.delete("refreshToken");
    return response;
  }

  if (refreshToken && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
