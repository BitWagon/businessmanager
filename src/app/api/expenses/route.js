import { connectDB } from '@/config/mongoose';
import Expense from '@/models/Expense';

export async function GET() {
  await connectDB();
  const expenses = await Expense.find().sort({ createdAt: -1 });
  return Response.json(expenses);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
 const newExpense = await Expense.create({
    ...data,
    date: new Date().toISOString(),
  });

  return Response.json(newExpense);
}
