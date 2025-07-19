'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  Building2,
  Mail,
  Phone,
  User,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    company: '',
    email: '',
    phone: '',
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(form).some((val) => !val);
    if (isEmpty) {
      alert('All fields are required');
      return;
    }

    // Submit logic here (e.g. to backend/Stripe)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Checkout</h1>

        {submitted ? (
          <div className="text-center space-y-4">
            <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
            <h2 className="text-xl font-semibold text-gray-700">Payment Successful</h2>
            <p className="text-gray-600">
              Thank you for subscribing to our BlackLedger plan.
            </p>

            {/* Back Button after success */}
            <button
              onClick={() => router.push('/dashboard')}
              className="inline-flex items-center mt-4 text-indigo-600 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Plan Summary */}
            <div className="border border-indigo-200 rounded-xl p-4 bg-indigo-50">
              <h2 className="text-lg font-semibold text-indigo-800">Plan Summary</h2>
              <div className="mt-2 text-sm text-indigo-700">
                <p>
                  Business Pro Plan – <strong>$49/month</strong>
                </p>
                <p>Billed monthly with full access to all modules.</p>
              </div>
            </div>

            {/* Company Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Company Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Company Name</label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      className="w-full border rounded-xl px-4 py-2 shadow-sm text-gray-600"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                    <Building2 className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Contact Person</label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      className="w-full border rounded-xl px-4 py-2 shadow-sm text-gray-600"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <User className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <div className="relative mt-1">
                    <input
                      type="email"
                      className="w-full border rounded-xl px-4 py-2 shadow-sm text-gray-600"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Mail className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      className="w-full border rounded-xl px-4 py-2 shadow-sm text-gray-600"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    <Phone className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600">Card Number</label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      className="w-full border rounded-xl px-4 py-2 shadow-sm text-gray-600"
                      placeholder="1234 5678 9012 3456"
                      value={form.cardNumber}
                      onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                    />
                    <CreditCard className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full border rounded-xl px-4 py-2 shadow-sm mt-1 text-gray-600"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">CVC</label>
                  <input
                    type="text"
                    className="w-full border rounded-xl px-4 py-2 shadow-sm mt-1 text-gray-600"
                    placeholder="123"
                    value={form.cvc}
                    onChange={(e) => setForm({ ...form, cvc: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl w-full font-semibold"
            >
              Complete Checkout
            </button>
            
          </form>
        )}
      </div>
    </div>
  );
}
