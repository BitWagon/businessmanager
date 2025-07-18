'use client';

import React from 'react';
import {
  Briefcase,
  Users,
  BarChart,
  CreditCard,
  Calendar,
  Settings,
  Activity,
  LineChart,
} from 'lucide-react';
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 8200 },
  { month: 'Feb', revenue: 9100 },
  { month: 'Mar', revenue: 12800 },
  { month: 'Apr', revenue: 9800 },
  { month: 'May', revenue: 11000 },
  { month: 'Jun', revenue: 12300 },
];

const teamActivities = [
  'Sarah completed "Finance Audit Report"',
  'John started "Client Onboarding Process"',
  'Aisha reviewed "Quarterly Budget"',
  'Mike commented on "ERP UI Design"',
];

export default function DashboardPage() {
  const handleTerminate = (member) => {
    alert(`Terminated ${member}`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-600">
        <DashboardCard title="Clients" value="128" icon={<Users className="text-blue-600" />} />
        <DashboardCard title="Projects" value="34" icon={<Briefcase className="text-green-600" />} />
        <DashboardCard title="Revenue" value="$987,300" icon={<CreditCard className="text-purple-600" />} />
        <DashboardCard title="Visits" value="12,845" icon={<BarChart className="text-orange-600" />} />
      </div>

      {/* Chart & Team Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-purple-600" />
              Revenue Trend
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <ReLineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2} />
            </ReLineChart>
          </ResponsiveContainer>
        </div>

        {/* Team Section with Terminate Button */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-blue-600" />
            Team Activity
          </h2>
          <ul className="space-y-3 text-sm text-gray-600">
            {teamActivities.map((activity, index) => {
              const name = activity.split(' ')[0]; // get first name
              return (
                <li key={index} className="flex justify-between items-center">
                  <span>👤 {activity}</span>
                  <button
                    onClick={() => handleTerminate(name)}
                    className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                  >
                    Terminate
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Bottom Activity and Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            Recent Activity
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✅ Client invoice sent to Alex</li>
            <li>📊 Project “ERP Integration” marked as complete</li>
            <li>📝 New client registered: Sarah Tech</li>
            <li>💼 Proposal sent to FinTech Co.</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 shadow">
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
      <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
