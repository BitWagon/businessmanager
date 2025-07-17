'use client';

import React from 'react';
import {
  Briefcase,
  Users,
  BarChart,
  CreditCard,
  Calendar,
  Settings,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Clients" value="128" icon={<Users className="text-blue-600" />} />
        <DashboardCard title="Projects" value="34" icon={<Briefcase className="text-green-600" />} />
        <DashboardCard title="Revenue" value="$42,300" icon={<CreditCard className="text-purple-600" />} />
        <DashboardCard title="Visits" value="12,845" icon={<BarChart className="text-orange-600" />} />
      </div>

      {/* Recent Activity / Calendar or To-do */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✅ Client invoice sent to Alex</li>
            <li>📊 Project “ERP Integration” marked as complete</li>
            <li>📝 New client registered: Sarah Tech</li>
            <li>💼 Proposal sent to FinTech Co.</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Calendar</h2>
            <Calendar className="text-gray-500" />
          </div>
          <div className="text-sm text-gray-500">No events today.</div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
      <div className="p-2 bg-gray-100 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
