// SRC: https://github.com/awinogrodzki/next-firebase-auth-edge

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authentication } from "next-firebase-auth-edge/lib/next/middleware";

const PUBLIC_PATHS = ["/sign-in", "/sign-up", "/"];

function redirectToHome(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

function redirectToLogin(request: NextRequest) {
  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/sign-in";
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  return authentication(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: process.env.FIREBASE_API_KEY || '',
    cookieName: "AuthToken",
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: false, // set to 'true' on https environments
      sameSite: "lax",
      maxAge: 12 * 60 * 60 * 24, // twelve days
    },
    cookieSignatureKeys: ["secret1", "secret2"],
    serviceAccount: {
      projectId: process.env.FIREBASE_PROJECT_ID || "",
      clientEmail: "YOUR-FIREBASE-CLIENT-EMAIL",
      privateKey: "YOUR-FIREBASE-PRIVATE-KEY",
    },
    handleValidToken: async ({ token, decodedToken }) => {
      // Authenticated user should not be able to access /login, /register and /reset-password routes
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }

      return NextResponse.next();
    },
    handleInvalidToken: async () => {
      return redirectToLogin(request);
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
      return redirectToLogin(request);
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
  ],
};
