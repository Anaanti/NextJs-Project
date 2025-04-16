import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse, NextRequest } from 'next/server'; // Import NextRequest

export async function GET(req: NextRequest) { // Type the req parameter
  const response = await handleAuth()(req, 'route');
  response.headers.set('Access-Control-Allow-Origin', '*'); // Temporary test
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function OPTIONS(req: NextRequest) { // Type the req parameter
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*', // Temporary test
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}