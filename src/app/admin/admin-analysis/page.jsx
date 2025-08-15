'use client';

import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Activity,
  LineChart,
  ArrowRight,
} from 'lucide-react';
import {
  LineChart as RLChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AnalysisPage() {
  const [expenses, setExpenses] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [total, setTotal] = useState(0);
  const [weeklyGrowth, setWeeklyGrowth] = useState('0%');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch('/api/expenses');
    const data = await res.json();
    setExpenses(data);
    calculateWeeklyPerformance(data);
  };

  const calculateWeeklyPerformance = (data) => {
    const today = new Date();
    const last7 = Array(7)
      .fill()
      .map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      })
      .reverse();

    const weekMap = {};
    last7.forEach((day) => (weekMap[day] = 0));

    let totalAmount = 0;
    data.forEach((e) => {
      const d = new Date(e.date);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      if (weekMap.hasOwnProperty(dayName)) {
        weekMap[dayName] += parseFloat(e.amount);
        totalAmount += parseFloat(e.amount);
      }
    });

    const formatted = Object.entries(weekMap).map(([name, value]) => ({
      name,
      value,
    }));

    setWeeklyData(formatted);
    setTotal(totalAmount.toFixed(2));

    // Growth rate logic (optional, based on previous 7 days)
    const now = new Date();
    const prevWeekTotal = data
      .filter((e) => {
        const date = new Date(e.date);
        const diff = (now - date) / (1000 * 60 * 60 * 24);
        return diff > 7 && diff <= 14;
      })
      .reduce((acc, e) => acc + parseFloat(e.amount), 0);

    if (prevWeekTotal > 0) {
      const growth = ((totalAmount - prevWeekTotal) / prevWeekTotal) * 100;
      setWeeklyGrowth(`${growth.toFixed(1)}%`);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-indigo-100">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Analytics Dashboard</h1>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: TrendingUp, label: 'Weekly Growth', value: weeklyGrowth },
            { icon: BarChart3, label: 'Total Expenses', value: `$${total}` },
            { icon: Activity, label: 'Expense Records', value: expenses.length },
            { icon: LineChart, label: 'Tracked Days', value: weeklyData.length },
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

        {/* Weekly Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Weekly Expenses</h2>
          <ResponsiveContainer width="100%" height={300} className='text-gray-600'>
            <RLChart data={weeklyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} />
            </RLChart>
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">Insights</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>You have logged {expenses.length} expenses so far.</li>
            <li>This week’s total expense: ${total}</li>
            <li>Growth compared to last week: {weeklyGrowth}</li>
          </ul>
          <button className="mt-4 inline-flex items-center text-indigo-600 hover:underline">
            View Full Report <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
