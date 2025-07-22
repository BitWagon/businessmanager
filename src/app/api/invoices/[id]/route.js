import { connectDB } from '@/config/mongoose';
import Invoice from '@/models/Invoice';

export async function PATCH(req, { params }) {
  await connectDB();
  const updates = await req.json();
  const updated = await Invoice.findByIdAndUpdate(params.id, updates, { new: true });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Invoice.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}
