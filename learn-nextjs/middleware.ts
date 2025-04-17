import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth({
  publicRoutes: [
    "/",               
    "/api/webhook",     
    "/_next/image",    
    "/images",          
  ],
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|api/public).*)",
  ],
};