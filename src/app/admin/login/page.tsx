"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed.');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-green-50/50 py-24 px-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-black/5">
        <h1 className="text-3xl font-bold text-forest-dark text-center mb-8">Admin Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            required
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
          />

          {error && <p className="text-sm text-red-600 font-semibold mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest-base hover:bg-forest-dark text-white py-4 rounded-xl font-semibold transition disabled:opacity-70"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}

