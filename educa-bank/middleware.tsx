import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/register", whenAuthenticated: "redirect" },
  { path: "/", whenAuthenticated: "redirect" },
  { path: "/home", whenAuthenticated: "redirect" },
  { path: "/pix", whenAuthenticated: "redirect" },
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const currentPath = req.nextUrl.pathname;

  const matchedRoute = publicRoutes.find((route) => route.path === currentPath);

  if (matchedRoute) {
    if (matchedRoute.whenAuthenticated === "redirect" && token) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};