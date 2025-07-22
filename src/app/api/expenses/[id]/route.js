import { connectDB } from "@/config/mongoose";
import Expense from "@/models/Expense";

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    await Expense.findByIdAndDelete(id);
    return Response.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    return Response.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
}
