'use client';
import Image from 'next/image';
import React, { memo } from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/AuthContext';

const Header = memo(function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const onLogout = async () => {
    await logout();
    window.location.href = '/auth/login';
  };
  return (
    <header role="banner" aria-label="هدر اصلی اپلیکیشن">
      <div className="shadow-md bg-white">
        <div className="container mx-auto py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="لوگوی اپلیکیشن مدیریت وظایف"
                width={32}
                height={32}
                priority
                sizes="32px"
                className="object-contain"
              />
              <h1 className="text-lg font-semibold mr-4">مدیریت وظایف من</h1>
            </div>
            <div
              className="flex items-center gap-3"
              role="complementary"
              aria-label="اطلاعات کاربر"
            >
              {isAuthenticated ? (
                <>
                  <Image
                    src="/avatar.png"
                    alt="آواتار کاربر"
                    width={32}
                    height={32}
                    priority
                    sizes="32px"
                    className="object-contain rounded-full"
                  />
                  <span className="mr-1" aria-label="پیام خوشامدگویی">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="text-sm text-red-600 hover:text-red-700"
                    aria-label="خروج"
                  >
                    خروج
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/auth/login"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    ورود
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    ثبت‌نام
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
