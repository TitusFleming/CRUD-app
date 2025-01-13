import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicPaths = ["/*", "/sign-in*", "/sign-up*"];
const isPublic = createRouteMatcher(publicPaths);

export default clerkMiddleware((auth, req) => {
  if (isPublic(req)) {
    return;
  }
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next|_static|api|favicon.ico).*)",
    "/(api(?!/auth).*)"
  ]
};