import { connectDB } from '@/config/mongoose';
import CheckOut from '@/models/CheckOut';

export async function PATCH(req, { params }) {
  await connectDB();

  const updated = await CheckOut.findByIdAndUpdate(
    params.id,
    { checkOutTime: new Date() },
    { new: true }
  );

  return Response.json(updated);
}
