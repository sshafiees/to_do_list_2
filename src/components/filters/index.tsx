'use client';

import FilterItem from './filterItem';
import {
  categories,
  priorities,
  statuses,
  sortOptions,
} from '../../constants/filters';
import Block from '../layout/block';
import React, { memo } from 'react';
import { useTaskFiltersContext } from '../../hooks/TaskFiltersContext';

const Filters = memo(function Filters() {
  const { filters, actions } = useTaskFiltersContext();
  const { categoryFilter, priorityFilter, statusFilter, sortOption } = filters;
  const {
    setCategoryFilter,
    setPriorityFilter,
    setStatusFilter,
    setSortOption,
  } = actions;
  return (
    <Block>
      <div
        className="grid grid-cols-4 gap-4"
        role="group"
        aria-label="فیلترهای وظایف"
      >
        <FilterItem
          title="دسته بندی"
          listItems={categories}
          currentValue={categoryFilter}
          onChange={setCategoryFilter}
        />
        <FilterItem
          title="اولویت‌ها"
          listItems={priorities}
          currentValue={priorityFilter}
          onChange={setPriorityFilter}
        />
        <FilterItem
          title="وضعیت"
          listItems={statuses}
          currentValue={statusFilter}
          onChange={setStatusFilter}
        />
        <FilterItem
          title="مرتب سازی"
          listItems={sortOptions}
          currentValue={sortOption}
          onChange={setSortOption}
        />
      </div>
    </Block>
  );
});

export default Filters;
