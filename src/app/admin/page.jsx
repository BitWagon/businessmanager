'use client';

import React, { useState, useEffect } from 'react';
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

export default function DashboardPage() {
  const [terminatedMembers, setTerminatedMembers] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [bills, setBills] = useState([]);
  const [teamActivities, setTeamActivities] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [goals, setGoals] = useState({ achieved: 0, target: 20000 });

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

  const currentCard = debitCards[cardIndex];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [expensesRes, invoicesRes, checkinRes, checkoutRes, usersRes] = await Promise.all([
          fetch('/api/expenses'),
          fetch('/api/invoices'),
          fetch('/api/checkin'),
          fetch('/api/check'),
          fetch('/api/users'),
        ]);

        const [expenses, invoices, checkins, checkouts, users] = await Promise.all([
          expensesRes.json(),
          invoicesRes.json(),
          checkinRes.json(),
          checkoutRes.json(),
          usersRes.json(),
        ]);

        const invoiceMap = {};
        invoices.forEach((inv) => {
          const date = new Date(inv.date);
          const month = date.toLocaleString('default', { month: 'short' });
          invoiceMap[month] = (invoiceMap[month] || 0) + inv.amount;
        });

        const revenueArray = Object.keys(invoiceMap).map((month) => ({
          month,
          revenue: invoiceMap[month],
        }));

        setRevenueData(revenueArray);

        const mappedBills = invoices.slice(0, 3).map((inv) => ({
          name: inv.description || 'Invoice',
          date: new Date(inv.date).toDateString(),
          lastCharge: new Date(inv.date).toDateString(),
          amount: `$${inv.amount}`,
        }));

        setBills(mappedBills);

        const activities = [...checkins, ...checkouts].map((entry) => {
          return `${entry.name} ${entry.type === 'checkin' ? 'checked in' : 'checked out'}`;
        });

        setTeamActivities(activities.slice(0, 5));

        const total = invoices.reduce((acc, inv) => acc + inv.amount, 0);
        setTotalBalance(total);

        const achieved = expenses.reduce((acc, e) => acc + e.amount, 0);
        setGoals({ achieved, target: 20000 });

      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      }
    };

    fetchDashboardData();
  }, []);

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

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-black">Welcome to your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow space-y-4 text-gray-600">
          <h2 className="text-lg text-gray-700">Total Balance</h2>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">${totalBalance}</span>
            <span className="text-sm text-gray-500">All Accounts</span>
          </div>
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

        <div className="bg-white p-6 rounded-lg shadow space-y-4 text-gray-600">
          <h2 className="text-lg text-gray-700">Goals</h2>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">${goals.target}</span>
            <span className="text-sm text-gray-500">This Month</span>
          </div>
          <hr />
          <div className="text-sm space-y-1">
            <p className="flex justify-between items-center text-gray-600">
              <span className="flex gap-2 items-center">
                <Target className="w-4 h-4" /> Target Achieved
              </span>
              <span className="font-semibold">${goals.achieved}</span>
            </p>
            <p className="flex justify-between items-center text-gray-600">
              <span className="flex gap-2 items-center">
                <CircleDollarSign className="w-4 h-4" /> This Month Target
              </span>
              <span className="font-semibold">${goals.target}</span>
            </p>
          </div>
          <div className="text-center pt-4 text-sm text-gray-500">
            🎯 Target vs Achievement
          </div>
        </div>

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
                    <p className="text-sm font-bold">{bill.date.split(' ')[2]}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  className={`flex justify-between items-center ${isTerminated ? 'line-through text-red-400' : ''}`}
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
