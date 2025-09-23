import { StatusType } from '../types/tasks';

type ChipType = { label: string; color: string; textColor: string };

export const priorityChip: Record<string, ChipType> = {
  low: {
    label: 'پایین',
    color: 'bg-green-300',
    textColor: 'text-green-800',
  },
  medium: {
    label: 'متوسط',
    color: 'bg-yellow-300',
    textColor: 'text-yellow-800',
  },
  high: {
    label: 'بالا',
    color: 'bg-red-300',
    textColor: 'text-red-800',
  },
};

export const statusChip: Record<StatusType, ChipType> = {
  notStarted: {
    label: 'در انتظار',
    color: 'bg-blue-300',
    textColor: 'text-blue-800',
  },
  inProgress: {
    label: 'در حال انجام',
    color: 'bg-orange-300',
    textColor: 'text-orange-800',
  },
  done: {
    label: 'انجام شده',
    color: 'bg-green-300',
    textColor: 'text-green-800',
  },
};
