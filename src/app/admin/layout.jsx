'use client';

import AdminSidebar from "@/components/admin-sidebar";


export default function AdminLayoutWrapper({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="fixed top-0 left-0 h-screen z-10">
        <AdminSidebar />
      </aside>
      <main className="flex-1 ml-64 p-4 bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
