'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Activity,
  ChevronLeft,
  ChevronRight,
  Target,
  CircleDollarSign,
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

const bills = [
  {
    name: 'Odoo - Monthly',
    date: 'May 15',
    lastCharge: '14 May, 2022',
    amount: '$150',
  },
  {
    name: 'M365 - Yearly',
    date: 'June 16',
    lastCharge: '14 May, 2022',
    amount: '$559',
  },
];

// New: Debit card slider data
const debitCards = [
  {
    type: 'Debit Card',
    number: '**** **** **** 2598',
    balance: '$25,000',
    bg: 'bg-rose-500',
  },
  {
    type: 'Visa Card',
    number: '**** **** **** 4983',
    balance: '$18,720',
    bg: 'bg-indigo-500',
  },
  {
    type: 'MasterCard',
    number: '**** **** **** 7832',
    balance: '$34,200',
    bg: 'bg-emerald-500',
  },
];

export default function DashboardPage() {
  const [terminatedMembers, setTerminatedMembers] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);

  const handleTerminate = (member) => {
    const confirmed = confirm(`Are you sure you want to terminate ${member}?`);
    if (confirmed) {
      setTerminatedMembers((prev) => [...prev, member]);
    }
  };

  const handleNextCard = () => {
    setCardIndex((prev) => (prev + 1) % debitCards.length);
  };

  const handlePrevCard = () => {
    setCardIndex((prev) => (prev - 1 + debitCards.length) % debitCards.length);
  };

  const currentCard = debitCards[cardIndex];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-black">Welcome to your Dashboard</h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance with Card Slider */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4 text-gray-600">
          <h2 className="text-lg text-gray-700">Total Balance</h2>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">$240,399</span>
            <span className="text-sm text-gray-500">All Accounts</span>
          </div>

          {/* Card Display */}
          <div className={`${currentCard.bg} text-white rounded-lg p-4 space-y-2`}>
            <p className="text-sm">Account Type</p>
            <p className="font-semibold text-lg">{currentCard.type}</p>
            <p className="tracking-widest">{currentCard.number}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">{currentCard.balance}</p>
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
           
          </div>

          {/* Slider Navigation */}
          <div className="flex items-center justify-between text-sm text-gray-400 pt-2">
            <button onClick={handlePrevCard} className="flex items-center gap-1 hover:text-black">
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <div className="flex gap-1">
              {debitCards.map((_, idx) => (
                <span key={idx} className={`text-lg ${idx === cardIndex ? 'text-black' : 'text-gray-300'}`}>•</span>
              ))}
            </div>
            <button onClick={handleNextCard} className="flex items-center gap-1 hover:text-black">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4 text-gray-600">
          <h2 className="text-lg text-gray-700">Goals</h2>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">$20,000</span>
            <span className="text-sm text-gray-500">May, 2023</span>
          </div>
          <hr />
          <div className="text-sm space-y-1">
            <p className="flex justify-between items-center text-gray-600">
              <span className="flex gap-2 items-center">
                <Target className="w-4 h-4" /> Target Achieved
              </span>
              <span className="font-semibold">$12,500</span>
            </p>
            <p className="flex justify-between items-center text-gray-600">
              <span className="flex gap-2 items-center">
                <CircleDollarSign className="w-4 h-4" /> This Month Target
              </span>
              <span className="font-semibold">$20,000</span>
            </p>
          </div>
          <div className="text-center pt-4 text-sm text-gray-500">
            🎯 Target vs Achievement
          </div>
        </div>

        {/* Upcoming Bills */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div className="flex justify-between items-center text-gray-500">
            <h2 className="text-lg text-gray-600">Upcoming Bill</h2>
            <span className="text-sm cursor-pointer hover:underline text-gray-500">View All</span>
          </div>
          {bills.map((bill, i) => (
            <div key={i} className="border-b pb-3 last:border-b-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 px-3 py-2 rounded text-center text-gray-600">
                    <p className="text-sm font-bold">{bill.date.split(' ')[0]}</p>
                    <p className="text-xs uppercase">{bill.date.split(' ')[1]}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">{bill.name}</p>
                    <p className="text-xs text-gray-500">Last Charge - {bill.lastCharge}</p>
                  </div>
                </div>
                <span className="bg-gray-100 px-3 py-1 rounded text-sm font-semibold text-gray-600">
                  {bill.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <LineChart className="w-5 h-5 text-purple-600" />
            Revenue Trend
          </h2>
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

        {/* Team Activity */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-blue-600" />
            Team Activity
          </h2>
          <ul className="space-y-3 text-sm text-gray-600">
            {teamActivities.map((activity, index) => {
              const name = activity.split(' ')[0];
              const isTerminated = terminatedMembers.includes(name);
              return (
                <li
                  key={index}
                  className={`flex justify-between items-center ${
                    isTerminated ? 'line-through text-red-400' : ''
                  }`}
                >
                  <span>👤 {activity}</span>
                  <button
                    onClick={() => handleTerminate(name)}
                    disabled={isTerminated}
                    className={`text-xs px-2 py-1 rounded transition ${
                      isTerminated
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}
                  >
                    {isTerminated ? 'Terminated' : 'Terminate'}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
