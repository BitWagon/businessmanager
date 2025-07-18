'use client';

import { useState } from 'react';
import {
  Plus, Wallet, CalendarDays, FileText, BarChart3
} from 'lucide-react';

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Marketing', amount: 250, category: 'Ads', date: '2025-07-15' },
    { id: 2, title: 'Cloud Hosting', amount: 120, category: 'Server', date: '2025-07-13' },
  ]);

  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: '' });

  const handleAddExpense = () => {
    if (!newExpense.title || !newExpense.amount || !newExpense.category) return;
    const updated = [
      ...expenses,
      {
        ...newExpense,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        amount: parseFloat(newExpense.amount),
      },
    ];
    setExpenses(updated);
    setNewExpense({ title: '', amount: '', category: '' });
  };

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* 1. Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <Wallet className="text-purple-600" />
          <div>
            <h4 className="text-sm text-gray-700">Total Spent</h4>
            <p className="text-xl font-bold">${expenses.reduce((acc, e) => acc + e.amount, 0)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <CalendarDays className="text-green-600" />
          <div>
            <h4 className="text-sm text-gray-700">This Month</h4>
            <p className="text-xl font-bold text-gray-600">$370</p>
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

      {/* 2. Recent Expenses */}
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
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="px-6 py-4">{e.title}</td>
                  <td className="px-6 py-4">${e.amount}</td>
                  <td className="px-6 py-4">{e.category}</td>
                  <td className="px-6 py-4">{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Add New Expense */}
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

      {/* 4. Expense Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Expense Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
          {[...new Set(expenses.map((e) => e.category))].map((cat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow text-center">
              <p className="font-medium">{cat}</p>
              <p className="text-gray-500 text-sm">
                ${expenses.filter((e) => e.category === cat).reduce((acc, e) => acc + e.amount, 0)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Monthly Chart Placeholder */}
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
