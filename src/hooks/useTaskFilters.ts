import { useState, useMemo, useCallback, useEffect } from 'react';
import { supabaseBrowser } from '../lib/supabaseClient';
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
  deleteTask: (taskId: string) => void;
}

export function useTaskFilters() {
  const [tasks, setTasks] = useState<TaskItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    let isMounted = true;
    let channel: ReturnType<typeof supabaseBrowser.channel> | null = null;

    async function fetchTasks(userId?: string) {
      setLoading(true);
      setError(null);
      let query = supabaseBrowser
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: sortOption !== 'oldest' });
      if (userId) {
        query = query.eq('user_id', userId);
      }
      if (categoryFilter !== 'all')
        query = query.eq('category', categoryFilter);
      if (priorityFilter !== 'all')
        query = query.eq('priority', priorityFilter);
      if (statusFilter !== 'all') query = query.eq('status', statusFilter);
      if (searchText) query = query.ilike('title', `%${searchText}%`);
      const { data, error } = await query;
      if (!isMounted) return;
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      const mapped: TaskItemType[] = (data || []).map(row => ({
        taskId: row.id,
        title: row.title,
        description: row.description ?? '',
        dueDate: row.due_date ? new Date(row.due_date) : new Date(),
        createdAt: row.created_at ? new Date(row.created_at) : new Date(),
        priority: row.priority as 'low' | 'medium' | 'high',
        status: row.status as any,
        category: row.category ?? 'general',
      }));
      setTasks(mapped);
    }

    async function init() {
      const { data: userData } = await supabaseBrowser.auth.getUser();
      const userId = userData.user?.id;
      await fetchTasks(userId);
      if (!userId) return;
      channel = supabaseBrowser
        .channel('tasks-realtime')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'tasks',
            filter: `user_id=eq.${userId}`,
          },
          () => {
            fetchTasks(userId);
          }
        )
        .subscribe();
    }
    init();
    return () => {
      isMounted = false;
      if (channel) {
        supabaseBrowser.removeChannel(channel);
      }
    };
  }, [categoryFilter, priorityFilter, statusFilter, searchText, sortOption]);

  const filteredTasks = useMemo(() => {
    return tasks;
  }, [tasks]);

  const deleteTask = useCallback(async (taskId: string) => {
    setTasks(prev => prev.filter(t => t.taskId !== taskId));
    await supabaseBrowser.from('tasks').delete().eq('id', taskId);
  }, []);

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
    deleteTask,
  };

  return {
    filters,
    actions,
    filteredTasks,
    loading,
    error,
  };
}
