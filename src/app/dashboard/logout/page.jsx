'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('authToken'); // ✅ Remove token
    await fetch('/api/logout');
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded-md transition"
    >
      <LogOut className="h-5 w-5" />
      Logout
    </button>
  );
}
