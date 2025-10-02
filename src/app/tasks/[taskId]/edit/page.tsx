'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { supabaseBrowser } from '../../../../lib/supabaseClient';

type FormValues = {
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'inProgress' | 'notStarted' | 'done';
  category: string;
};

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = Array.isArray(params?.taskId)
    ? params.taskId[0]
    : (params?.taskId as string);

  const [task, setTask] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    let mounted = true;
    async function load() {
      const { data: userData } = await supabaseBrowser.auth.getUser();
      if (!userData.user) {
        router.replace('/auth/login');
        return;
      }
      const { data, error } = await supabaseBrowser
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single();
      if (!mounted) return;
      setLoading(false);
      if (error) return;
      setTask(data);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [taskId]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      status: 'notStarted',
      category: 'work',
    },
    values: task
      ? {
          title: task.title || '',
          description: task.description || '',
          dueDate: task.due_date
            ? new Date(task.due_date).toISOString().slice(0, 10)
            : '',
          priority: (task.priority as any) || 'medium',
          status: (task.status as any) || 'notStarted',
          category: task.category || 'work',
        }
      : undefined,
  });

  const onSubmit = async (data: FormValues) => {
    const { error } = await supabaseBrowser
      .from('tasks')
      .update({
        title: data.title.trim(),
        description: data.description?.trim() || null,
        due_date: data.dueDate ? new Date(data.dueDate).toISOString() : null,
        priority: data.priority,
        status: data.status,
        category: data.category,
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId);
    if (error) {
      alert(error.message);
      return;
    }
    router.push('/');
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-2xl p-6">در حال بارگذاری…</div>
    );
  }

  if (!task) {
    return (
      <div className="container mx-auto max-w-2xl p-6">
        <div className="shadow-md bg-white border border-gray-100 rounded-md p-6">
          <h1 className="text-xl font-semibold mb-4">وظیفه یافت نشد</h1>
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700"
              onClick={() => router.back()}
            >
              بازگشت
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="shadow-md bg-white border border-gray-100 rounded-md p-6">
        <h1 className="text-xl font-semibold mb-6">ویرایش وظیفه</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1">عنوان</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-2"
              aria-invalid={!!errors.title || undefined}
              {...register('title', { required: 'عنوان الزامی است' })}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">توضیحات</label>
            <textarea
              className="w-full rounded-md border border-gray-300 p-2"
              rows={4}
              {...register('description')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">تاریخ سررسید</label>
              <input
                type="date"
                className="w-full rounded-md border border-gray-300 p-2"
                {...register('dueDate')}
              />
            </div>

            <div>
              <label className="block mb-1">اولویت</label>
              <select
                className="w-full rounded-md border border-gray-300 p-2"
                {...register('priority')}
              >
                <option value="low">پایین</option>
                <option value="medium">متوسط</option>
                <option value="high">بالا</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">وضعیت</label>
              <select
                className="w-full rounded-md border border-gray-300 p-2"
                {...register('status')}
              >
                <option value="notStarted">در انتظار</option>
                <option value="inProgress">در حال انجام</option>
                <option value="done">انجام شده</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">دسته‌بندی</label>
              <select
                className="w-full rounded-md border border-gray-300 p-2"
                {...register('category')}
              >
                <option value="work">کاری</option>
                <option value="personal">شخصی</option>
                <option value="fun">تفریح</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700"
              onClick={() => router.back()}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              بروزرسانی
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
