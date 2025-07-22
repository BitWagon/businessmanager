import { NextResponse } from 'next/server';
import { connectDB } from '@/config/mongoose'; 
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already in use.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: 'User registered successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
