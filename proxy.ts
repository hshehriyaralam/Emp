import { NextRequest, NextResponse } from "next/server";

const adminProtectedPaths = [
  "/admin-dashboard",
  "/admin-notification",
  "/admin-employees",
];
const adminAuthPaths = [
  "/",
  "/admin-login",
  "/admin-register",
  "/admin-verfication",
];
const employeeProtectedPaths = ["/employee-dashboard"];
const employeeAuthPaths = ["/login", "/register"];

const isPathOrChild = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

const matchesAnyPath = (pathname: string, routes: string[]) =>
  routes.some((route) => isPathOrChild(pathname, route));

const redirectTo = (request: NextRequest, path: string) =>
  NextResponse.redirect(new URL(path, request.url));

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAdminSession = Boolean(request.cookies.get("adminToken")?.value);
  const hasEmployeeSession = Boolean(
    request.cookies.get("employeeToken")?.value,
  );
  if (
    pathname === "/" &&
    !hasAdminSession &&
    !hasEmployeeSession
  ) {
    return redirectTo(request, "/login");
  }

  const isAdminRoute =
    pathname === "/" ||
    matchesAnyPath(pathname, [...adminProtectedPaths, ...adminAuthPaths]);
  const isEmployeeRoute = matchesAnyPath(pathname, [
    ...employeeProtectedPaths,
    ...employeeAuthPaths,
  ]);

  if (isAdminRoute) {
    if (hasEmployeeSession && !hasAdminSession) {
      return redirectTo(request, "/employee-dashboard");
    }
    if (
      matchesAnyPath(pathname, adminProtectedPaths) &&
      !hasAdminSession
    ) {
      return redirectTo(request, "/admin-login");
    }
    if (matchesAnyPath(pathname, adminAuthPaths) && hasAdminSession) {
      return redirectTo(request, "/admin-dashboard");
    }
  }

  if (isEmployeeRoute) {
    if (hasAdminSession && !hasEmployeeSession) {
      return redirectTo(request, "/admin-dashboard");
    }
    if (
      matchesAnyPath(pathname, employeeProtectedPaths) &&
      !hasEmployeeSession
    ) {
      return redirectTo(request, "/login");
    }
    if (matchesAnyPath(pathname, employeeAuthPaths) && hasEmployeeSession) {
      return redirectTo(request, "/employee-dashboard");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin-dashboard/:path*",
    "/admin-notification/:path*",
    "/admin-employees/:path*",
    "/admin-login/:path*",
    "/admin-register/:path*",
    "/admin-verfication/:path*",
    "/employee-dashboard/:path*",
    "/login/:path*",
    "/register/:path*",
  ],
};
