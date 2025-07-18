'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'Expanses', icon: LayoutDashboard, href: '/dashboard/expanses' },
    { label: 'Clients', icon: Users, href: '/clients' },
    { label: 'Invoices', icon: FileText, href: '/invoices' },
    { label: 'Reports', icon: BarChart2, href: '/reports' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="flex">
      <div
        className={`h-screen bg-gray-900 text-white transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <span className={`text-xl font-bold ${!isOpen && 'hidden'}`}>
            BizSoft
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav className="mt-4 space-y-2">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center space-x-4 px-4 py-2 hover:bg-gray-800 transition"
            >
              <Icon className="w-5 h-5" />
              {isOpen && <span>{label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
