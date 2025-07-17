import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 400 }
      );
    }

    // TODO: Add MongoDB or Prisma DB logic here (check if user exists, then save)

    console.log('✅ Registered User:', { name, email, password });

    return NextResponse.json(
      { message: 'User registered successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Registration error:', error);
    return NextResponse.json(
      { message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
