import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 🔐 TODO: Replace with DB query and hashed password check
    const fakeUser = {
      email: 'test@example.com',
      password: 'Test123', // In production: hashed & compared with bcrypt
    };

    if (email !== fakeUser.email || password !== fakeUser.password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 🔐 TODO: Add JWT or session logic here

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
