'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function NewTaskPage() {
  const router = useRouter();
  type FormValues = {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    category: string;
  };

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
  });

  const onSubmit = async (_data: FormValues) => {
    // Placeholder: integrate with your data layer later
    router.push('/');
  };

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <div className="shadow-md bg-white border border-gray-100 rounded-md p-6">
        <h1 className="text-xl font-semibold mb-6">ایجاد وظیفه جدید</h1>
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
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
