import { connectDB } from '@/config/mongoose';
import CheckIn from '@/models/Check';

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  try {
    const newEntry = await CheckIn.create(data);
    return Response.json(newEntry, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Failed to create check-in' }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();

  try {
    const records = await CheckIn.find().sort({ checkInTime: -1 });
    return Response.json(records, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch check-ins' }, { status: 500 });
  }
}
