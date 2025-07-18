'use client';

import { useState } from 'react';
import {
  Settings,
  User,
  Lock,
  Building2,
  Save,
} from 'lucide-react';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  });

  const [company, setCompany] = useState({
    companyName: 'Smart Business Inc.',
    timezone: 'Asia/Karachi',
  });

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

  const handleSaveProfile = async () => {
    try {
      const res = await fetch('/api/settings/profile', {
        method: 'POST',
        body: JSON.stringify(profile),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setStatus((prev) => ({ ...prev, profile: 'Profile saved!' }));
      } else {
        setStatus((prev) => ({ ...prev, profile: 'Error saving profile.' }));
      }
    } catch {
      setStatus((prev) => ({ ...prev, profile: 'Network error.' }));
    }
  };

  const handleSaveCompany = async () => {
    try {
      const res = await fetch('/api/settings/company', {
        method: 'POST',
        body: JSON.stringify(company),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setStatus((prev) => ({ ...prev, company: 'Company info updated!' }));
      } else {
        setStatus((prev) => ({ ...prev, company: 'Error updating company.' }));
      }
    } catch {
      setStatus((prev) => ({ ...prev, company: 'Network error.' }));
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      setStatus((prev) => ({ ...prev, password: 'New passwords do not match.' }));
      return;
    }

    try {
      const res = await fetch('/api/settings/password', {
        method: 'POST',
        body: JSON.stringify(passwords),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setStatus((prev) => ({ ...prev, password: 'Password updated!' }));
      } else {
        setStatus((prev) => ({ ...prev, password: 'Password update failed.' }));
      }
    } catch {
      setStatus((prev) => ({ ...prev, password: 'Network error.' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-6 space-y-10">
      {/* Header */}
      <div className="text-2xl font-bold flex items-center gap-2">
        <Settings className="text-indigo-600" />
        Settings
      </div>

      {/* Profile Settings */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="text-lg font-semibold flex items-center gap-2">
          <User className="text-blue-500" />
          Profile Information
        </div>
        <input
          type="text"
          placeholder="Full Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="w-full p-2 border rounded"
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

      {/* Company Settings */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="text-lg font-semibold flex items-center gap-2">
          <Building2 className="text-green-500" />
          Company Settings
        </div>
        <input
          type="text"
          placeholder="Company Name"
          value={company.companyName}
          onChange={(e) =>
            setCompany({ ...company, companyName: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Timezone"
          value={company.timezone}
          onChange={(e) =>
            setCompany({ ...company, timezone: e.target.value })
          }
          className="w-full p-2 border rounded"
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

      {/* Change Password with Toggle */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="text-lg font-semibold flex items-center gap-2">
          <Lock className="text-purple-500" />
          Change Password
        </div>

        {/* Current Password */}
        <div className="relative">
          <input
            type={passwords.showCurrent ? 'text' : 'password'}
            placeholder="Current Password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className="w-full p-2 border rounded pr-20"
          />
          <button
            type="button"
            onClick={() =>
              setPasswords((prev) => ({
                ...prev,
                showCurrent: !prev.showCurrent,
              }))
            }
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
          >
            {passwords.showCurrent ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            type={passwords.showNew ? 'text' : 'password'}
            placeholder="New Password"
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            className="w-full p-2 border rounded pr-20"
          />
          <button
            type="button"
            onClick={() =>
              setPasswords((prev) => ({
                ...prev,
                showNew: !prev.showNew,
              }))
            }
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
          >
            {passwords.showNew ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={passwords.showConfirm ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
            className="w-full p-2 border rounded pr-20"
          />
          <button
            type="button"
            onClick={() =>
              setPasswords((prev) => ({
                ...prev,
                showConfirm: !prev.showConfirm,
              }))
            }
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500"
          >
            {passwords.showConfirm ? 'Hide' : 'Show'}
          </button>
        </div>

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
