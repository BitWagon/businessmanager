'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' && localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Please login first</h2>
        <p className="text-gray-600 mb-6">
          You must be registered and logged in to view the dashboard.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
