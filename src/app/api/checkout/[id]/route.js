import { connectDB } from '@/config/mongoose';
import Check from '@/models/Check';

export async function PATCH(req, { params }) {
  await connectDB();

  const updated = await Check.findByIdAndUpdate(
    params.id,
    { checkOutTime: new Date() },
    { new: true }
  );

  return Response.json(updated);
}
