'use client';

import { useEffect, useState } from 'react';
import {
  Settings,
  User,
  Lock,
  Building2,
  Save,
} from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [company, setCompany] = useState({ companyName: '', timezone: '' });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  });
  const [status, setStatus] = useState({
    profile: '',
    company: '',
    password: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/me');
      const data = await res.json();
      setProfile({ name: data.name, email: data.email });
      setCompany({ companyName: data.companyName || '', timezone: data.timezone || '' });
    };
    fetchUser();
  }, []);

  const handleSaveProfile = async () => {
    const res = await fetch('/api/settings/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    const msg = res.ok ? 'Profile saved!' : 'Error saving profile.';
    setStatus((prev) => ({ ...prev, profile: msg }));
  };

  const handleSaveCompany = async () => {
    const res = await fetch('/api/settings/company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(company),
    });
    const msg = res.ok ? 'Company info updated!' : 'Error updating company.';
    setStatus((prev) => ({ ...prev, company: msg }));
  };

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      setStatus((prev) => ({ ...prev, password: 'New passwords do not match.' }));
      return;
    }
    const res = await fetch('/api/settings/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passwords),
    });
    const msg = res.ok ? 'Password updated!' : 'Password update failed.';
    setStatus((prev) => ({ ...prev, password: msg }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-6 space-y-10">
      <div className="text-2xl font-bold flex items-center gap-2 text-black">
        <Settings className="text-indigo-600" />
        Settings
      </div>

      {/* Profile */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="text-lg font-semibold flex items-center gap-2 text-gray-700">
          <User className="text-blue-500" />
          Profile Information
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
          onClick={handleSaveProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
          <Save size={16} />
          Save Profile
        </button>
        <p className="text-sm text-gray-500">{status.profile}</p>
      </div>

      {/* Company Info */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="text-lg font-semibold flex items-center gap-2 text-gray-700">
          <Building2 className="text-green-500" />
          Company Settings
        </div>
        <input
          type="text"
          placeholder="Company Name"
          value={company.companyName}
          onChange={(e) => setCompany({ ...company, companyName: e.target.value })}
          className="w-full p-2 border rounded text-gray-600"
        />
        <input
          type="text"
          placeholder="Timezone"
          value={company.timezone}
          onChange={(e) => setCompany({ ...company, timezone: e.target.value })}
          className="w-full p-2 border rounded text-gray-600"
        />
        <button
          onClick={handleSaveCompany}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
        >
          <Save size={16} />
          Save Company Info
        </button>
        <p className="text-sm text-gray-500">{status.company}</p>
      </div>

      {/* Password Change */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="text-lg font-semibold flex items-center gap-2 text-gray-700">
          <Lock className="text-purple-500" />
          Change Password
        </div>
        {['current', 'new', 'confirm'].map((field) => (
          <div className="relative" key={field}>
            <input
              type={passwords[`show${field[0].toUpperCase() + field.slice(1)}`] ? 'text' : 'password'}
              placeholder={`${field === 'confirm' ? 'Confirm' : field === 'current' ? 'Current' : 'New'} Password`}
              value={passwords[field]}
              onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
              className="w-full p-2 border rounded pr-20 text-gray-600"
            />
            <button
              type="button"
              onClick={() =>
                setPasswords((prev) => ({
                  ...prev,
                  [`show${field[0].toUpperCase() + field.slice(1)}`]: !prev[`show${field[0].toUpperCase() + field.slice(1)}`],
                }))
              }
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
            >
              {passwords[`show${field[0].toUpperCase() + field.slice(1)}`] ? 'Hide' : 'Show'}
            </button>
          </div>
        ))}
        <button
          onClick={handlePasswordChange}
          className="bg-purple-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-purple-700"
        >
          <Save size={16} />
          Update Password
        </button>
        <p className="text-sm text-gray-500">{status.password}</p>
      </div>
    </div>
  );
}
