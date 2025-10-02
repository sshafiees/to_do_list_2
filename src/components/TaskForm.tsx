'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

export type TaskFormData = {
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'notStarted' | 'inProgress' | 'done';
  category: string;
};

export type TaskFormProps = {
  register: UseFormRegister<TaskFormData>;
  errors: FieldErrors<TaskFormData>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<TaskFormData>;
};

export default function TaskForm({
  register,
  errors,
  onSubmit,
  onCancel,
  isLoading = false,
  defaultValues,
}: TaskFormProps) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="block mb-1">عنوان</label>
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 p-2"
          aria-invalid={!!errors.title || undefined}
          {...register('title', { required: 'عنوان الزامی است' })}
          defaultValue={defaultValues?.title || ''}
        />
        {errors.title && (
          <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">توضیحات</label>
        <textarea
          className="w-full rounded-md border border-gray-300 p-2"
          rows={4}
          {...register('description')}
          defaultValue={defaultValues?.description || ''}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">تاریخ سررسید</label>
          <input
            type="date"
            className="w-full rounded-md border border-gray-300 p-2"
            {...register('dueDate')}
            defaultValue={defaultValues?.dueDate || ''}
          />
        </div>

        <div>
          <label className="block mb-1">اولویت</label>
          <select
            className="w-full rounded-md border border-gray-300 p-2"
            {...register('priority')}
            defaultValue={defaultValues?.priority || 'medium'}
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
            defaultValue={defaultValues?.status || 'notStarted'}
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
            defaultValue={defaultValues?.category || 'work'}
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
          onClick={onCancel}
        >
          انصراف
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'در حال ذخیره...' : 'ذخیره'}
        </button>
      </div>
    </form>
  );
}
