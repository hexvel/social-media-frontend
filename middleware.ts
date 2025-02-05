import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

async function checkRefreshToken(refreshToken: string) {
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Refresh ${refreshToken}`,
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

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
    const newTokens = await checkRefreshToken(refreshToken);

    if (newTokens) {
      const response = NextResponse.next();
      response.cookies.set("refreshToken", newTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      if (newTokens.accessToken) {
        response.cookies.set("accessToken", newTokens.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }
      return response;
    }

    const response = NextResponse.redirect(new URL("/auth/login", request.url));
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
