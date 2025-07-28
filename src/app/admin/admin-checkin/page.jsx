'use client';

import { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';

export default function CheckInPage() {
  const [checkIns, setCheckIns] = useState([]);
  const [form, setForm] = useState({ name: '', department: '', purpose: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCheckIns = async () => {
    try {
      const res = await fetch('/api/checkin');
      const data = await res.json();
      setCheckIns(data);
    } catch (err) {
      console.error('Error loading check-ins:', err);
    }
  };

  useEffect(() => {
    fetchCheckIns();
  }, []);

  const handleCheckIn = async () => {
    const { name, department, purpose } = form;
    if (!name || !department || !purpose) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ name: '', department: '', purpose: '' });
        setError('');
        fetchCheckIns();
      } else {
        const errData = await res.json();
        setError(errData.message || 'Submission failed.');
      }
    } catch (err) {
      setError('Server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-indigo-100 space-y-10">
      <div className="flex items-center gap-4 text-2xl font-bold text-black">
        <UserPlus className="text-green-600" />
        <h1>Check-In Dashboard</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">New Check-In</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Department"
            className="p-2 border rounded w-full"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
          <input
            type="text"
            placeholder="Purpose"
            className="p-2 border rounded w-full"
            value={form.purpose}
            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleCheckIn}
          disabled={loading}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Checking In...' : 'Check In'}
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Check-In Records</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Purpose</th>
                <th className="px-4 py-2">Check-In</th>
                <th className="px-4 py-2">Check-Out</th>
              </tr>
            </thead>
            <tbody>
              {checkIns.map((entry) => (
                <tr key={entry._id} className="border-t text-gray-600">
                  <td className="px-4 py-2">{entry.name}</td>
                  <td className="px-4 py-2">{entry.department}</td>
                  <td className="px-4 py-2">{entry.purpose}</td>
                  <td className="px-4 py-2">{new Date(entry.checkInTime).toLocaleTimeString()}</td>
                  <td className="px-4 py-2 text-gray-400">
                    {entry.checkOutTime ? new Date(entry.checkOutTime).toLocaleTimeString() : '—'}
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
