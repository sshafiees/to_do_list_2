import FilterItem from './filterItem';
import {
  categories,
  priorities,
  statuses,
  sortOptions,
} from '../../constants/filters';
import Block from '../layout/block';
import React, { memo } from 'react';

type FiltersProps = {
  categoryFilter: string | null;
  setCategoryFilter: (value: string) => void;
  priorityFilter: string | null;
  setPriorityFilter: (value: string) => void;
  statusFilter: string | null;
  setStatusFilter: (value: string) => void;
  sortOption: string | null;
  setSortOption: (value: string) => void;
};

const Filters = memo(function Filters({
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  sortOption,
  setSortOption,
}: FiltersProps) {
  return (
    <Block>
      <div className="grid grid-cols-4 gap-4" role="group" aria-label="فیلترهای وظایف">
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
