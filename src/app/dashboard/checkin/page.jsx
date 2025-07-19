'use client';

import { useState } from 'react';
import { UserPlus, Building2, Clock, Trash2 } from 'lucide-react';

export default function CheckInPage() {
  const [checkIns, setCheckIns] = useState([]);
  const [form, setForm] = useState({ name: '', department: '', purpose: '' });
  const [error, setError] = useState('');

  const handleCheckIn = () => {
    const { name, department, purpose } = form;
    if (!name || !department || !purpose) {
      setError('All fields are required.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...form,
      time: new Date().toLocaleTimeString(),
    };

    setCheckIns([newEntry, ...checkIns]);
    setForm({ name: '', department: '', purpose: '' });
    setError('');
  };

  const handleTerminate = (id) => {
    const confirmed = confirm("Are you sure you want to terminate this check-in?");
    if (confirmed) {
      setCheckIns((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-indigo-100 space-y-10">
      {/* Header */}
      <div className="flex items-center gap-4 text-2xl font-bold text-black">
        <UserPlus className="text-green-600" />
        <h1>Check-In Dashboard</h1>
      </div>

      {/* Check-In Form */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">New Check-In</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded w-full text-gray-600"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Department"
            className="p-2 border rounded w-full text-gray-600"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
          <input
            type="text"
            placeholder="Purpose"
            className="p-2 border rounded w-full text-gray-600"
            value={form.purpose}
            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleCheckIn}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Check In
        </button>
      </div>

      {/* Check-In List */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Check-In Records</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Purpose</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {checkIns.map((entry) => (
                <tr key={entry.id} className="border-t text-gray-600">
                  <td className="px-4 py-2">{entry.name}</td>
                  <td className="px-4 py-2">{entry.department}</td>
                  <td className="px-4 py-2">{entry.purpose}</td>
                  <td className="px-4 py-2">{entry.time}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleTerminate(entry.id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Terminate
                    </button>
                  </td>
                </tr>
              ))}
              {checkIns.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No check-ins yet.
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
