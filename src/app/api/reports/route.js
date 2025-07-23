import { connectDB } from '@/config/mongoose';
import Invoice from '@/models/Invoice';
import User from '@/models/User';
import Check from '@/models/Check';
import Expense from '@/models/Expense';

export async function GET() {
  await connectDB();

  try {
    const [invoices, users, checkins, expenses] = await Promise.all([
      Invoice.find(),
      User.find(),
      Check.find().sort({ checkInTime: -1 }),
      Expense.find(),
    ]);

    return Response.json({
      invoices,
      users,
      checkins,
      expenses,
    });
  } catch (error) {
    return Response.json({ error: 'Failed to load reports data' }, { status: 500 });
  }
}
