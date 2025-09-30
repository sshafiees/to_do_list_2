'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Search from '../components/search';
import Filters from '../components/filters';
import Overview from '../components/overview';
import { TaskFiltersProvider } from '../hooks/TaskFiltersContext';

// Dynamic import for better code splitting
const TasksList = dynamic(() => import('../components/tasks'), {
  loading: () => {
    const Loading = require('../components/ui/loading').default;
    return <Loading />;
  },
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'مدیریت وظایف من',
            description:
              'یک اپلیکیشن مدیریت وظایف پیشرفته با قابلیت فیلتر، جستجو و دسته‌بندی',
            applicationCategory: 'ProductivityApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />

      <TaskFiltersProvider>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
          <div className="container h-full">
            <div className="grid gap-4">
              <Filters />
              <Search />
              <Overview />
              <TasksList />
            </div>
          </div>
        </div>
      </TaskFiltersProvider>
    </>
  );
}
