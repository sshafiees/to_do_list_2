import { supabaseBrowser } from '../supabaseClient';
import { TaskItemType } from '../../types/tasks';

export async function createTask(taskData: {
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'notStarted' | 'inProgress' | 'done';
  category: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: sessionData } = await supabaseBrowser.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) {
      return { success: false, error: 'کاربر وارد نشده است' };
    }

    const { error } = await supabaseBrowser.from('tasks').insert({
      user_id: userId,
      title: taskData.title.trim(),
      description: taskData.description?.trim() || null,
      due_date: taskData.dueDate
        ? new Date(taskData.dueDate).toISOString()
        : null,
      priority: taskData.priority,
      status: taskData.status,
      category: taskData.category,
    });

    if (error) {
      console.error('Task creation error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'خطای غیرمنتظره رخ داد' };
  }
}

export async function updateTask(
  taskId: string,
  taskData: {
    title: string;
    description?: string;
    dueDate?: string;
    priority: 'low' | 'medium' | 'high';
    status: 'notStarted' | 'inProgress' | 'done';
    category: string;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseBrowser
      .from('tasks')
      .update({
        title: taskData.title.trim(),
        description: taskData.description?.trim() || null,
        due_date: taskData.dueDate
          ? new Date(taskData.dueDate).toISOString()
          : null,
        priority: taskData.priority,
        status: taskData.status,
        category: taskData.category,
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId);

    if (error) {
      console.error('Task update error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'خطای غیرمنتظره رخ داد' };
  }
}

export async function removeTask(
  taskId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabaseBrowser
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      console.error('Task deletion error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'خطای غیرمنتظره رخ داد' };
  }
}

export async function getTasks(): Promise<{
  success: boolean;
  data?: TaskItemType[];
  error?: string;
}> {
  try {
    const { data: sessionData } = await supabaseBrowser.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) {
      return { success: false, error: 'کاربر وارد نشده است' };
    }

    const { data, error } = await supabaseBrowser
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Tasks fetch error:', error);
      return { success: false, error: error.message };
    }

    const mappedTasks: TaskItemType[] = (data || []).map(row => ({
      taskId: row.id,
      title: row.title,
      description: row.description ?? '',
      dueDate: row.due_date ? new Date(row.due_date) : new Date(),
      createdAt: row.created_at ? new Date(row.created_at) : new Date(),
      priority: row.priority as 'low' | 'medium' | 'high',
      status: row.status as 'notStarted' | 'inProgress' | 'done',
      category: row.category ?? 'general',
    }));

    return { success: true, data: mappedTasks };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'خطای غیرمنتظره رخ داد' };
  }
}
