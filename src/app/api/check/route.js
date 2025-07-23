import { connectDB } from '@/config/mongoose'; 
import Check from '@/models/Check';

export async function GET() {
  await connectDB();
  const records = await Check.find().sort({ checkInTime: -1 });
  return Response.json(records);
}

export async function PATCH(req) {
  await connectDB();
  const { id } = await req.json();

  const updated = await Check.findByIdAndUpdate(
    id,
    { checkOutTime: new Date() },
    { new: true }
  );

  return Response.json(updated);
}
