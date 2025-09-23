import './globals.css';
import Header from '../components/layout/header';
import ErrorBoundary from '../components/error-boundary';
import React from 'react';

export const metadata = {
  title: 'مدیریت وظایف من - Todo List App',
  description: 'یک اپلیکیشن مدیریت وظایف پیشرفته با قابلیت فیلتر، جستجو و دسته‌بندی',
  keywords: ['todo', 'task management', 'productivity', 'مدیریت وظایف'],
  authors: [{ name: 'Todo App Developer' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'مدیریت وظایف من',
    description: 'مدیریت آسان و کارآمد وظایف روزانه',
    type: 'website',
    locale: 'fa_IR',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`antialiased`}>
        <ErrorBoundary>
          <Header />
          <main role="main">
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
