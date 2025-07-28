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
  Wallet,
  DollarSign,
  TrendingDown,
  PieChart,
  ChartPie,
  ReceiptText,
  LogOut,
  Check,
  CircleCheckBigIcon,
  ListChecks,
} from 'lucide-react';
import Link from 'next/link';

// ✅ Rename the component here to AdminSidebar
export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { label: 'Expanses', icon: DollarSign, href: '/admin/admin-expanses' },
    { label: 'Analysis', icon: TrendingDown, href: '/admin/admin-analysis' },
    { label: 'Employee', icon: Users, href: '/admin/admin-employee' },
    { label: 'Check in', icon: CircleCheckBigIcon, href: '/admin/admin-checkin' },
    { label: 'Check out', icon: ListChecks, href: '/admin/admin-checkout' },
    { label: 'Invoices', icon: FileText, href: '/admin/admin-invoices' },
    { label: 'Reports', icon: BarChart2, href: '/admin/admin-report' },
    { label: 'Settings', icon: Settings, href: '/admin/admin-setting' },
    { label: 'Logout', icon: LogOut, href: '/admin/admin-logout' },
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
            Admin Panel
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
