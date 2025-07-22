import { NextResponse } from 'next/server'; 
import User from '@/models/User'; // adjust path if needed
import { connectDB } from '@/config/mongoose';

export async function GET() {
  await connectDB();

  try {
    const users = await User.find({}, '-password'); // exclude password
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}
