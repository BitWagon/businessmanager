// app/check-out/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { UserMinus } from 'lucide-react';

export default function CheckOutPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecords = async () => {
    try {
      const res = await fetch('/api/check');
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleCheckOut = async (id) => {
    setLoading(true);
    try {
      await fetch('/api/check', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchRecords();
    } catch (err) {
      console.error('Check-out failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentlyCheckedIn = records.filter((r) => !r.checkOutTime);
  const alreadyCheckedOut = records.filter((r) => r.checkOutTime);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-indigo-100 space-y-10">
      <div className="flex items-center gap-4 text-2xl font-bold text-black">
        <UserMinus className="text-red-600" />
        <h1>Check-Out Dashboard</h1>
      </div>

      {/* Section: Checked-In Users */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Currently Checked-In</h2>

        {currentlyCheckedIn.length === 0 ? (
          <p className="text-gray-500">No one is currently checked in.</p>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Purpose</th>
                <th className="px-4 py-2">Check-In</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentlyCheckedIn.map((entry) => (
                <tr key={entry._id} className="border-t text-gray-600">
                  <td className="px-4 py-2">{entry.name}</td>
                  <td className="px-4 py-2">{entry.department}</td>
                  <td className="px-4 py-2">{entry.purpose}</td>
                  <td className="px-4 py-2">{new Date(entry.checkInTime).toLocaleTimeString()}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleCheckOut(entry._id)}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
                      disabled={loading}
                    >
                      {loading ? 'Checking Out...' : 'Check Out'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Section: Checked-Out Records */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Checked-Out Records</h2>

        {alreadyCheckedOut.length === 0 ? (
          <p className="text-gray-500">No check-outs yet.</p>
        ) : (
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
              {alreadyCheckedOut.map((entry) => (
                <tr key={entry._id} className="border-t text-gray-600">
                  <td className="px-4 py-2">{entry.name}</td>
                  <td className="px-4 py-2">{entry.department}</td>
                  <td className="px-4 py-2">{entry.purpose}</td>
                  <td className="px-4 py-2">{new Date(entry.checkInTime).toLocaleTimeString()}</td>
                  <td className="px-4 py-2 text-green-600">
                    {new Date(entry.checkOutTime).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
