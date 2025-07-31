// src/app/api/settings/profile/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req) {
  const body = await req.json();
  const { email, name } = body;

  await dbConnect();

  const user = await User.findOneAndUpdate({ email }, { name }, { new: true });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Profile updated', user });
}
