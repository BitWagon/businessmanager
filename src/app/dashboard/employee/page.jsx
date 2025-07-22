'use client';

import React, { useEffect, useState } from 'react';
import { User, Briefcase, Mail, Phone, X } from 'lucide-react';

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error('Failed to load users', err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to terminate this employee?')) {
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Employees</h1>
        </div>

        {/* Real Users */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <div
              key={emp._id}
              className="bg-white rounded-2xl shadow p-5 flex flex-col gap-3 relative"
            >
              <button
                onClick={() => handleDelete(emp._id)}
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
                    {emp.role || 'User'}
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
                  {emp.phone || 'N/A'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
