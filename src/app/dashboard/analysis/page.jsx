'use client';

import React from 'react';
import {
  TrendingUp,
  BarChart3,
  Activity,
  LineChart,
  ArrowRight,
} from 'lucide-react';
import { LineChart as RLChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
];

export default function AnalysisPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-indigo-100">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Analytics Dashboard</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
            Export Report
          </button>
        </div>

        {/* Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: TrendingUp, label: 'Growth Rate', value: '24%' },
            { icon: BarChart3, label: 'New Users', value: '1,239' },
            { icon: Activity, label: 'Activity', value: '87%' },
            { icon: LineChart, label: 'Sessions', value: '9,321' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 flex items-center space-x-4">
              <item.icon className="text-indigo-600 w-6 h-6" />
              <div>
                <div className="text-sm text-gray-500">{item.label}</div>
                <div className="text-xl font-semibold text-gray-800">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Weekly Performance</h2>
          <ResponsiveContainer width="100%" height={300} className="text-gray-600">
            <RLChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} />
            </RLChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Activities</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-2 px-4">User</th>
                  <th className="py-2 px-4">Action</th>
                  <th className="py-2 px-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['John Doe', 'Logged in', '2 min ago'],
                  ['Jane Smith', 'Updated profile', '10 min ago'],
                  ['Alice', 'Generated report', '1 hour ago'],
                ].map(([user, action, time], i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2 px-4">{user}</td>
                    <td className="py-2 px-4">{action}</td>
                    <td className="py-2 px-4 text-gray-600">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights Summary */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">Insights</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Peak traffic on Wednesday — consider boosting performance those days.</li>
            <li>Users are most active between 10 AM and 12 PM.</li>
            <li>Mobile usage up by 34% this week.</li>
          </ul>
          <button className="mt-4 inline-flex items-center text-indigo-600 hover:underline">
            View Full Report <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
