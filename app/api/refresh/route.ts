import { NextResponse, type NextRequest } from "next/server";

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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const refreshToken = searchParams.get("refreshToken");

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token is required" },
      { status: 400 },
    );
  }

  const newTokens = await checkRefreshToken(refreshToken);

  if (!newTokens) {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 },
    );
  }

  return NextResponse.json(newTokens, { status: 200 });
}
