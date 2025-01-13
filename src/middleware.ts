import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  debug: true  // This will help us see what's happening
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(html?|css|js|json|jpe?g|png|svg|ico|webp|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};