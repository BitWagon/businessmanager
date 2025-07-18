'use client';

import { useState } from 'react';
import { FileText, PlusCircle, Trash2, User, DollarSign, Calendar } from 'lucide-react';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({
    client: '',
    amount: '',
    date: '',
  });

  const [error, setError] = useState('');

  const handleAddInvoice = () => {
    if (!form.client || !form.amount || !form.date) {
      setError('All fields are required');
      return;
    }

    const newInvoice = {
      id: Date.now(),
      ...form,
      status: 'Unpaid',
    };

    setInvoices([newInvoice, ...invoices]);
    setForm({ client: '', amount: '', date: '' });
    setError('');
  };

  const handleDelete = (id) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-6 space-y-10">
      {/* Header */}
      <div className="flex items-center gap-3 text-2xl font-bold">
        <FileText className="text-indigo-600" />
        <h1>Invoices</h1>
      </div>

      {/* New Invoice Form */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Create New Invoice</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Client Name"
            className="p-2 border rounded"
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="p-2 border rounded"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleAddInvoice}
          className="mt-3 bg-indigo-600 text-white px-5 py-2 rounded flex items-center gap-2 hover:bg-indigo-700 transition"
        >
          <PlusCircle size={18} />
          Add Invoice
        </button>
      </div>

      {/* Invoice List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Invoice Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-t">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    {invoice.client}
                  </td>
                  <td className="px-4 py-2 flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    {invoice.amount}
                  </td>
                  <td className="px-4 py-2 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {invoice.date}
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-yellow-600 font-medium">{invoice.status}</span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(invoice.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No invoices yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
