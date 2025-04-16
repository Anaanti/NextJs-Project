// import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextResponse, NextRequest } from 'next/server'; // Import NextRequest

// export async function GET(req: NextRequest) { // Type the req parameter
//   const response = await handleAuth()(req, 'route');
//   response.headers.set('Access-Control-Allow-Origin', '*'); // Temporary test
//   response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   return response;
// }

// export async function OPTIONS(req: NextRequest) { // Type the req parameter
//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       'Access-Control-Allow-Origin': '*', // Temporary test
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//   });
// }
import { NextRequest, NextResponse } from 'next/server';
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

// Helper function to add CORS headers
function corsHeaders(response: Response | NextResponse): NextResponse {
  const nextResponse = response instanceof NextResponse ? response : NextResponse.json(response);
  
  nextResponse.headers.set('Access-Control-Allow-Credentials', 'true');
  nextResponse.headers.set('Access-Control-Allow-Origin', 'https://thequillandparchment-gro68qyxk-yatianaanti-gmailcoms-projects.vercel.app');
  nextResponse.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS');
  nextResponse.headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
  
  return nextResponse;
}

// Handle OPTIONS preflight requests
export async function OPTIONS() {
  return corsHeaders(new NextResponse(null, { status: 200 }));
}

// Handle GET requests
export async function GET(request: NextRequest) {
  try {
    const authResult = await handleAuth(request);
    // Convert the auth result to a NextResponse
    const response = NextResponse.json(authResult);
    return corsHeaders(response);
  } catch (error) {
    console.error('Authentication error:', error);
    return corsHeaders(
      NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      )
    );
  }
}

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    const authResult = await handleAuth(request);
    // Convert the auth result to a NextResponse
    const response = NextResponse.json(authResult);
    return corsHeaders(response);
  } catch (error) {
    console.error('Authentication error:', error);
    return corsHeaders(
      NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      )
    );
  }
}