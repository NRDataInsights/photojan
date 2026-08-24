import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Страницу входа и API входа пропускаем без авторизации
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login"
  ) {
    return NextResponse.next();
  }

  const session =
    request.cookies.get("photojan_admin")?.value;

  const expected =
    process.env.ADMIN_SESSION_SECRET;

  const authorised = Boolean(
    session &&
    expected &&
    session === expected
  );

  // Нет действующей сессии
  if (!authorised) {
    // API возвращает 401
    if (pathname.startsWith("/api/admin/")) {
      return NextResponse.json(
        { error: "Unauthorised" },
        { status: 401 }
      );
    }

    // Страницы admin отправляем на login
    const loginUrl = new URL(
      "/admin/login",
      request.url
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};