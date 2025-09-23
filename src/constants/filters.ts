import { StatusType } from '../types/tasks';

export type SelectItem = { label: string; value: string };
export type StatusItem = { label: string; value: StatusType | 'all' };

export const categories: SelectItem[] = [
  {
    value: 'all',
    label: 'همه',
  },
  {
    value: 'personal',
    label: 'شخصی',
  },
  {
    value: 'work',
    label: 'کاری',
  },
  {
    value: 'fun',
    label: 'تفریحی',
  },
];

export const priorities: SelectItem[] = [
  {
    value: 'all',
    label: 'همه',
  },
  {
    value: 'high',
    label: 'بالا',
  },
  {
    value: 'medium',
    label: 'متوسط',
  },
  {
    value: 'low',
    label: 'پایین',
  },
];

export const statuses: StatusItem[] = [
  {
    value: 'all',
    label: 'همه',
  },
  {
    value: 'done',
    label: 'تکمیل شده',
  },
  {
    value: 'inProgress',
    label: 'در حال انجام',
  },
  {
    value: 'notStarted',
    label: 'بدون وضعیت',
  },
];

export const sortOptions: SelectItem[] = [
  {
    value: 'latest',
    label: 'جدیدترین ها',
  },
  {
    value: 'oldest',
    label: 'قدیمی ها',
  },
];
