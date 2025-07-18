// app/api/logout/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  // Clear cookies (adjust based on your actual auth strategy)
  const response = NextResponse.redirect('/');
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  return response;
}
