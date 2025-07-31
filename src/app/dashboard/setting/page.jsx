'use client';

import { useEffect, useState } from 'react';
import { Settings, User, Save, Lock } from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('');
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [passwordStatus, setPasswordStatus] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
     const token = localStorage.getItem('authToken');

    const res = await fetch('/api/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

      if (res.ok) {
        const data = await res.json();
        setProfile({ name: data.name, email: data.email });
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/settings/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: profile.name }),
    });
    setStatus(res.ok ? 'Profile updated successfully!' : 'Error updating profile.');
  };

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      setPasswordStatus('New passwords do not match.');
      return;
    }

    const res = await fetch('/api/settings/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        current: passwords.current,
        new: passwords.new,
      }),
    });

    if (res.ok) {
      setPasswordStatus('Password changed successfully!');
      setPasswords({ current: '', new: '', confirm: '' });
    } else {
      const data = await res.json();
      setPasswordStatus(data.error || 'Error changing password.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-6 space-y-10">
      <div className="text-2xl font-bold flex items-center gap-2 text-black">
        <Settings className="text-indigo-600" />
        Settings
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="text-lg font-semibold flex items-center gap-2 text-gray-700">
          <User className="text-blue-500" />
          Profile
        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 border rounded text-gray-600"
        />

        <input
          type="email"
          placeholder="Email"
          value={profile.email}
          disabled
          className="w-full p-2 border rounded text-gray-400 cursor-not-allowed bg-gray-100"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
          <Save size={16} />
          Save
        </button>

        <p className="text-sm text-gray-500">{status}</p>
      </div>

      {/* Change Password */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="text-lg font-semibold flex items-center gap-2 text-gray-700">
          <Lock className="text-purple-500" />
          Change Password
        </div>

        <input
          type="password"
          placeholder="Current Password"
          value={passwords.current}
          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
          className="w-full p-2 border rounded text-gray-600"
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwords.new}
          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
          className="w-full p-2 border rounded text-gray-600"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwords.confirm}
          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
          className="w-full p-2 border rounded text-gray-600"
        />

        <button
          onClick={handlePasswordChange}
          className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-purple-700"
        >
          <Save size={16} />
          Update Password
        </button>

        <p className="text-sm text-gray-500">{passwordStatus}</p>
      </div>
    </div>
  );
}
