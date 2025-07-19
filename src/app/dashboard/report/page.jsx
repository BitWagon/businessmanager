'use client';

import {
  Users,
  FileText,
  DollarSign,
  PieChart as PieIcon,
  BarChart3,
  LineChart as LineChartIcon,
  Star,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const barData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 2500 },
  { name: 'May', revenue: 6000 },
];

const pieData = [
  { name: 'Paid', value: 65 },
  { name: 'Unpaid', value: 35 },
];

const COLORS = ['#34d399', '#f87171'];

const topClients = [
  { name: 'Alpha Corp', revenue: '$4,200' },
  { name: 'Beta Ltd.', revenue: '$3,850' },
  { name: 'Gamma LLC', revenue: '$3,400' },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-indigo-100 space-y-8">
      {/* Header */}
      <div className="text-2xl font-bold flex items-center gap-3 text-black">
        <BarChart3 className="text-indigo-600" />
        Reports & Analytics
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <Users className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-700">Total Clients</p>
            <p className="text-lg font-semibold text-gray-600">124</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <DollarSign className="text-green-500" />
          <div>
            <p className="text-sm text-gray-700">Monthly Revenue</p>
            <p className="text-lg font-semibold text-gray-600">$18,450</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FileText className="text-purple-500" />
          <div>
            <p className="text-sm text-gray-700">Total Invoices</p>
            <p className="text-lg font-semibold text-gray-600">89</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center gap-2 mb-4 font-medium text-gray-700">
            <BarChart3 className="text-indigo-600" />
            Monthly Revenue (Bar)
          </div>
          <ResponsiveContainer width="100%" height={250} className="text-gray-600">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow text-gray-700">
          <div className="flex items-center gap-2 mb-4 font-medium">
            <PieIcon className="text-indigo-600" />
            Invoice Status (Pie)
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow text-gray-700">
        <div className="flex items-center gap-2 mb-4 font-medium">
          <LineChartIcon className="text-indigo-600" />
          Revenue Trend (Line)
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Clients Section */}
      <div className="bg-white p-6 rounded-xl shadow text-gray-700">
        <div className="flex items-center gap-2 mb-4 font-medium">
          <Star className="text-yellow-500" />
          Top Performing Clients
        </div>
        <ul className="space-y-2">
          {topClients.map((client, index) => (
            <li
              key={index}
              className="flex justify-between px-4 py-2 rounded-lg bg-indigo-50 text-indigo-800"
            >
              <span>{client.name}</span>
              <span className="font-semibold">{client.revenue}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
