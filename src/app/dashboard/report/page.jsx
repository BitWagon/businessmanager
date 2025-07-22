'use client';

import { useEffect, useState } from 'react';
import {
  Users, DollarSign, FileText, BarChart3,
  PieChart as PieIcon, LineChart as LineIcon, Star
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar,
  LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts';

export default function ReportsPage() {
  const [expenses, setExpenses] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
  async function fetchAll() {
    try {
      const res = await fetch('/api/reports');
      if (!res.ok) throw new Error('Failed to fetch');

      const { invoices, users, checkins, expenses } = await res.json();
      setInvoices(invoices);
      setEmployees(users);
      setCheckins(checkins);
      setExpenses(expenses);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }
  fetchAll();
  }, []);

  const totalClients = employees.length;
  const monthlyRevenue = invoices
    .filter(inv => new Date(inv.date).getMonth() === new Date().getMonth())
    .reduce((s, inv) => s + +inv.amount, 0)
    .toFixed(2);
  const totalInvoices = invoices.length;

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString('default', { month: 'short' });
    const revenue = invoices
      .filter(inv => new Date(inv.date).getMonth() === i)
      .reduce((s, inv) => s + +inv.amount, 0);
    return { name: month, revenue };
  });

  const paidCount = invoices.filter(inv => inv.status === 'Paid').length;
  const unpaidCount = invoices.length - paidCount;
  const pieData = [
    { name: 'Paid', value: paidCount },
    { name: 'Unpaid', value: unpaidCount },
  ];
  const COLORS = ['#34d399', '#f87171'];

  const clientTotals = invoices.reduce((map, inv) => {
    map[inv.client] = (map[inv.client] || 0) + +inv.amount;
    return map;
  }, {});
  const topClients = Object.entries(clientTotals)
    .map(([name, total]) => ({ name, revenue: total }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map(c => ({ ...c, revenue: `$${c.revenue.toFixed(2)}` }));

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-indigo-100 space-y-8">
      <div className="text-2xl font-bold flex items-center gap-3 text-black">
        <BarChart3 className="text-indigo-600" />
        Reports & Analytics
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard icon={<Users className="text-blue-500" />} label="Total Employees" value={totalClients} />
        <SummaryCard icon={<DollarSign className="text-green-500" />} label="Monthly Invoice Revenue" value={`$${monthlyRevenue}`} />
        <SummaryCard icon={<FileText className="text-purple-500" />} label="Total Invoices" value={totalInvoices} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartContainer icon={<BarChart3 className="text-indigo-600" />} title="Monthly Revenue (Invoices)">
          <ResponsiveContainer height={250}>
            <BarChart data={months}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer icon={<PieIcon className="text-indigo-600" />} title="Invoice Status">
          <ResponsiveContainer height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={80} label>
                {pieData.map((_, idx) => <Cell key={idx} fill={COLORS[idx]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <ChartContainer icon={<LineIcon className="text-indigo-600" />} title="Revenue Trend">
        <ResponsiveContainer height={250}>
          <LineChart data={months}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="bg-white p-6 rounded-xl shadow text-gray-700">
        <div className="flex items-center gap-2 mb-4 font-medium">
          <Star className="text-yellow-500" />
          Top Clients
        </div>
        <ul className="space-y-2">
          {topClients.map((c, idx) => (
            <li key={idx} className="flex justify-between px-4 py-2 rounded-lg bg-indigo-50 text-indigo-800">
              <span>{c.name}</span><span>{c.revenue}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SummaryCard({ icon, label, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
      {icon}
      <div>
        <p className="text-sm text-gray-700">{label}</p>
        <p className="text-lg font-semibold text-gray-600">{value}</p>
      </div>
    </div>
  );
}

function ChartContainer({ icon, title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-gray-700">
      <div className="flex items-center gap-2 mb-4 font-medium">{icon}{title}</div>
      {children}
    </div>
  );
}
