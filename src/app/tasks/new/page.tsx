'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { supabaseBrowser } from '../../../lib/supabaseClient';
import TaskForm, { TaskFormData } from '../../../components/TaskForm';
import { createTask } from '../../../lib/supabase/tasks';

export default function NewTaskPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      status: 'notStarted',
      category: 'work',
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    console.log('Form submitted with data:', data);
    const result = await createTask(data);

    if (result.success) {
      console.log('Task created successfully');
      router.push('/');
    } else {
      alert(`خطا در ایجاد وظیفه: ${result.error}`);
    }
  };

  React.useEffect(() => {
    console.log('NewTaskPage mounted, checking auth...');
    supabaseBrowser.auth.getUser().then(({ data, error }) => {
      console.log('Auth check result:', { data, error });
      if (error) {
        console.error('Auth error:', error);
        return;
      }
      if (!data.user) {
        console.log('No user found, redirecting to login');
        router.replace('/auth/login');
      } else {
        console.log('User authenticated:', data.user.email);
      }
    });
  }, [router]);

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="shadow-md bg-white border border-gray-100 rounded-md p-6">
        <h1 className="text-xl font-semibold mb-6">ایجاد وظیفه جدید</h1>
        <TaskForm
          register={register}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          onCancel={() => router.back()}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
}
