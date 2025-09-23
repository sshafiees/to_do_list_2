'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Search from '../components/search';
import Filters from '../components/filters';
import Overview from '../components/overview';
import { taskList } from '../mocks/tasks';
import { useTaskFilters } from '../hooks/useTaskFilters';

// Dynamic import for better code splitting
const TasksList = dynamic(() => import('../components/tasks'), {
  loading: () => {
    const Loading = require('../components/ui/loading').default;
    return <Loading />;
  },
  ssr: false
});

export default function Home() {
  const { filters, actions, filteredTasks } = useTaskFilters(taskList);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "مدیریت وظایف من",
            "description": "یک اپلیکیشن مدیریت وظایف پیشرفته با قابلیت فیلتر، جستجو و دسته‌بندی",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
        <div className="container h-full">
          <div className="grid gap-4">
            <Filters
              categoryFilter={filters.categoryFilter}
              setCategoryFilter={actions.setCategoryFilter}
              priorityFilter={filters.priorityFilter}
              setPriorityFilter={actions.setPriorityFilter}
              statusFilter={filters.statusFilter}
              setStatusFilter={actions.setStatusFilter}
              sortOption={filters.sortOption}
              setSortOption={actions.setSortOption}
            />
            <Search searchText={filters.searchText} setSearchText={actions.setSearchText} />
            <Overview taskList={filteredTasks} />
            <TasksList taskList={filteredTasks} />
          </div>
        </div>
      </div>
    </>
  );
}
