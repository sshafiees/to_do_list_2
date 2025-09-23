import { useState, useMemo, useCallback } from 'react';
import { TaskItemType } from '../types/tasks';

export interface TaskFilters {
    searchText: string;
    categoryFilter: string;
    priorityFilter: string;
    statusFilter: string;
    sortOption: string;
}

export interface TaskFilterActions {
    setSearchText: (value: string) => void;
    setCategoryFilter: (value: string) => void;
    setPriorityFilter: (value: string) => void;
    setStatusFilter: (value: string) => void;
    setSortOption: (value: string) => void;
    resetFilters: () => void;
}

export function useTaskFilters(taskList: TaskItemType[]) {
    const [searchText, setSearchText] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('latest');

    const resetFilters = useCallback(() => {
        setSearchText('');
        setCategoryFilter('all');
        setPriorityFilter('all');
        setStatusFilter('all');
        setSortOption('latest');
    }, []);

    const filteredTasks = useMemo(() => {
        let filtered = taskList.filter(task => {
            if (categoryFilter !== 'all' && task.category !== categoryFilter) {
                return false;
            }
            if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
                return false;
            }
            if (statusFilter !== 'all' && task.status !== statusFilter) {
                return false;
            }
            return (
                task.title.includes(searchText) || task.description.includes(searchText)
            );
        });

        // Sort the filtered tasks
        return filtered.sort((a, b) => {
            if (sortOption === 'latest') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else if (sortOption === 'oldest') {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            return 0;
        });
    }, [taskList, searchText, categoryFilter, priorityFilter, statusFilter, sortOption]);

    const filters: TaskFilters = {
        searchText,
        categoryFilter,
        priorityFilter,
        statusFilter,
        sortOption,
    };

    const actions: TaskFilterActions = {
        setSearchText,
        setCategoryFilter,
        setPriorityFilter,
        setStatusFilter,
        setSortOption,
        resetFilters,
    };

    return {
        filters,
        actions,
        filteredTasks,
    };
}
