'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Wallet,
  CalendarDays,
  FileText,
  BarChart3,
  CircleMinus,
} from 'lucide-react';

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: '' });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await fetch('/api/expenses');
    const data = await res.json();
    setExpenses(data);
  };

  const handleAddExpense = async () => {
    if (!newExpense.title || !newExpense.amount || !newExpense.category) return;

    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense),
    });

    if (res.ok) {
      setNewExpense({ title: '', amount: '', category: '' });
      fetchExpenses();
    }
  };

  const handleDeleteExpense = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this expense?');
    if (!confirmed) return;

    const res = await fetch(`/api/expenses/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchExpenses(); // Refresh the list
    }
  };


  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      <h2 className='font-bold text-black text-3xl font-sans'>Expenses</h2>

      {/* Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <Wallet className="text-purple-600" />
          <div>
            <h4 className="text-sm text-gray-700">Total Spent</h4>
            <p className="text-xl font-bold text-gray-600">
              ${expenses.reduce((acc, e) => acc + parseFloat(e.amount), 0).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <CalendarDays className="text-green-600" />
          <div>
            <h4 className="text-sm text-gray-700">This Month</h4>
            <p className="text-xl font-bold text-gray-600">
              ${expenses
                .filter((e) => {
                  const expenseDate = new Date(e.date);
                  const now = new Date();
                  return (
                    expenseDate.getMonth() === now.getMonth() &&
                    expenseDate.getFullYear() === now.getFullYear()
                  );
                })
                .reduce((acc, e) => acc + parseFloat(e.amount), 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <FileText className="text-blue-600" />
          <div>
            <h4 className="text-sm text-gray-700">Records</h4>
            <p className="text-xl font-bold text-gray-600">{expenses.length}</p>
          </div>
        </div>
      </section>

      {/* Recent Expenses */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recent Expenses</h2>
        <div className="bg-white rounded-xl shadow overflow-hidden text-gray-600">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e._id} className="border-t">
                  <td className="px-6 py-4">{e.title}</td>
                  <td className="px-6 py-4">${e.amount}</td>
                  <td className="px-6 py-4">{e.category}</td>
                  <td className="px-6 py-4">
                    {new Date(e.date).toLocaleDateString()}
                  </td>
                  <button
                    onClick={() => handleDeleteExpense(e._id)}
                    className="text-red-600 hover:underline text-sm flex items-center pt-3 gap-1"
                  >
                    <CircleMinus className="w-4 h-4" />
                    Delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Expense */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Add Expense</h2>
        <div className="bg-white p-6 rounded-xl shadow space-y-4 text-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newExpense.title}
              onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Category"
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            onClick={handleAddExpense}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 flex items-center gap-2"
          >
            <Plus size={16} /> Add Expense
          </button>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Expense Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
          {[...new Set(expenses.map((e) => e.category))].map((cat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow text-center">
              <p className="font-medium">{cat}</p>
              <p className="text-gray-500 text-sm">
                ${expenses.filter((e) => e.category === cat).reduce((acc, e) => acc + parseFloat(e.amount), 0)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Chart Placeholder */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Monthly Expense Chart</h2>
        <div className="bg-white p-10 rounded-xl shadow flex justify-center items-center h-64 text-gray-400">
          <BarChart3 className="w-10 h-10 mr-2" />
          Chart Coming Soon...
        </div>
      </section>
    </div>
  );
}
