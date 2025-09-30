'use client';

import React, { createContext, useContext, useMemo } from 'react';
import {
  useTaskFilters,
  TaskFilters,
  TaskFilterActions,
} from './useTaskFilters';
import { TaskItemType } from '../types/tasks';

type TaskFiltersContextValue = {
  filters: TaskFilters;
  actions: TaskFilterActions;
  filteredTasks: TaskItemType[];
};

const TaskFiltersContext = createContext<TaskFiltersContextValue | undefined>(
  undefined
);

type TaskFiltersProviderProps = {
  children: React.ReactNode;
};

export function TaskFiltersProvider({ children }: TaskFiltersProviderProps) {
  const { filters, actions, filteredTasks } = useTaskFilters();

  const value = useMemo(
    () => ({ filters, actions, filteredTasks }),
    [filters, actions, filteredTasks]
  );

  return (
    <TaskFiltersContext.Provider value={value}>
      {children}
    </TaskFiltersContext.Provider>
  );
}

export function useTaskFiltersContext(): TaskFiltersContextValue {
  const ctx = useContext(TaskFiltersContext);
  if (!ctx) {
    throw new Error(
      'useTaskFiltersContext must be used within a TaskFiltersProvider'
    );
  }
  return ctx;
}
