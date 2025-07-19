'use client';

import React, { useState } from 'react';
import {
  User,
  Briefcase,
  Mail,
  Phone,
  Plus,
  X,
} from 'lucide-react';

export default function EmployeePage() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Software Engineer',
      email: 'john@example.com',
      phone: '+1 123 456 7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Product Manager',
      email: 'jane@example.com',
      phone: '+1 987 654 3210',
    },
  ]);

  const [form, setForm] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
  });

  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    if (!form.name || !form.role || !form.email || !form.phone) {
      alert('All fields are required');
      return;
    }

    const newEmployee = {
      id: Date.now(),
      ...form,
    };

    setEmployees((prev) => [...prev, newEmployee]);
    setForm({ name: '', role: '', email: '', phone: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to terminate this employee?')) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Employees</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {showForm ? 'Close' : 'Add Employee'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              {[
                { label: 'Full Name', name: 'name' },
                { label: 'Role', name: 'role' },
                { label: 'Email', name: 'email' },
                { label: 'Phone', name: 'phone' },
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
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
            >
              Save Employee
            </button>
          </div>
        )}

        {/* Employee Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 relative"
            >
              {/* Terminate Button */}
              <button
                onClick={() => handleDelete(emp.id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{emp.name}</h2>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {emp.role}
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {emp.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {emp.phone}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
