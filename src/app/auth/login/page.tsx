'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('ایمیل معتبر نیست.');
      return;
    }
    if (!password) {
      setError('رمز عبور را وارد کنید.');
      return;
    }
    setLoading(true);
    const res = await login({ email, password });
    setLoading(false);
    if (res.ok) {
      router.push('/');
    } else {
      setError(res.error || 'خطایی رخ داد.');
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur border border-gray-100 shadow-xl rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">ورود</h2>
              <p className="text-gray-500 text-sm mt-1">
                برای ادامه وارد حساب خود شوید
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  ایمیل
                </label>
                <input
                  dir="ltr"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition rounded-xl px-3 py-2 bg-white"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  رمز عبور
                </label>
                <input
                  dir="ltr"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition rounded-xl px-3 py-2 bg-white"
                  placeholder="********"
                  required
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden rounded-full py-3 px-4 text-white font-medium shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700" />
                <span className="relative">
                  {loading ? 'در حال ورود…' : 'ورود'}
                </span>
              </button>
            </form>
            <div className="text-center mt-4 text-sm text-gray-600">
              حساب ندارید؟{' '}
              <a
                href="/auth/register"
                className="text-blue-600 hover:text-blue-700"
              >
                ثبت‌نام
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
