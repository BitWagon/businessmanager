import React from 'react';
import Sidebar from '@/components/Sidebar'; // adjust if needed

export const metadata = {
  title: 'Dashboard',
  description: 'Business software dashboard',
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
