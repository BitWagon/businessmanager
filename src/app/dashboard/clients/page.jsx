'use client';

import React, { useState } from 'react';
import {
  Building2,
  User,
  Mail,
  Phone,
  Plus,
  X,
} from 'lucide-react';

export default function ClientsPage() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Acme Corp',
      contact: 'John Manager',
      email: 'john@acme.com',
      phone: '+1 123 456 7890',
    },
    {
      id: 2,
      name: 'Beta Ltd',
      contact: 'Emily Clark',
      email: 'emily@beta.com',
      phone: '+1 987 654 3210',
    },
  ]);

  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleAddClient = () => {
    if (!form.name || !form.contact || !form.email || !form.phone) {
      alert('All fields are required');
      return;
    }

    const newClient = {
      id: Date.now(),
      ...form,
    };

    setClients((prev) => [...prev, newClient]);
    setForm({ name: '', contact: '', email: '', phone: '' });
    setShowForm(false);
  };

  const handleDeleteClient = (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setClients((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Clients</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {showForm ? 'Close' : 'Add Client'}
          </button>
        </div>

        {/* Add Client Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              {[
                { label: 'Company Name', name: 'name' },
                { label: 'Contact Person', name: 'contact' },
                { label: 'Email Address', name: 'email' },
                { label: 'Phone Number', name: 'phone' },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600">{label}</label>
                  <input
                    type="text"
                    name={name}
                    value={form[name]}
                    onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                    className="mt-1 block w-full border rounded-xl px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleAddClient}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
            >
              Save Client
            </button>
          </div>
        )}

        {/* Clients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 relative"
            >
              {/* Delete Client */}
              <button
                onClick={() => handleDeleteClient(client.id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Building2 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{client.name}</h2>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {client.contact}
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {client.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {client.phone}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
