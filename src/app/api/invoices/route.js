import { connectDB } from '@/config/mongoose';
import Invoice from '@/models/Invoice';

export async function GET() {
  await connectDB();
  const invoices = await Invoice.find().sort({ createdAt: -1 });
  return Response.json(invoices);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newInvoice = await Invoice.create(data);
  return Response.json(newInvoice);
}
