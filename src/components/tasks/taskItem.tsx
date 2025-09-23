import React, { memo, useMemo } from 'react';
import Block from '../layout/block';
import Chip from '../ui/chip';
import { priorityChip, statusChip } from '../../constants/tasks';
import {
  FolderIcon,
  PencilSquareIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';
import { TaskItemType } from '../../types/tasks';

const TaskItem = memo(function TaskItem({
  taskId,
  title,
  description,
  dueDate,
  createdAt,
  priority,
  status,
  category,
}: TaskItemType) {
  const priorityTag = useMemo(() => priorityChip[priority] || {}, [priority]);
  const statusTag = useMemo(() => statusChip[status] || {}, [status]);

  const formattedDueDate = useMemo(() => dueDate.toLocaleDateString('fa-IR'), [dueDate]);
  const formattedCreatedDate = useMemo(() => createdAt.toLocaleDateString('fa-IR'), [createdAt]);

  return (
    <Block>
      <article role="listitem" aria-labelledby={`task-title-${taskId}`}>
        <div className="flex justify-between">
          <div className="flex gap-2 mb-2">
            <h3 id={`task-title-${taskId}`} className="font-bold">{title}</h3>
            <Chip
              label={priorityTag.label}
              color={priorityTag.color}
              textColor={priorityTag.textColor}
              aria-label={`اولویت: ${priorityTag.label}`}
            />
            <Chip
              label={statusTag.label}
              color={statusTag.color}
              textColor={statusTag.textColor}
              aria-label={`وضعیت: ${statusTag.label}`}
            />
          </div>
          <div className="flex" role="group" aria-label="عملیات وظیفه">
            <button
              type="button"
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="ویرایش وظیفه"
              title="ویرایش وظیفه"
            >
              <PencilSquareIcon className="h-5 w-5 text-gray-500" />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="حذف وظیفه"
              title="حذف وظیفه"
            >
              <TrashIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
        <p className="mb-2" id={`task-description-${taskId}`}>{description}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span className="text-gray-600 mr-2" aria-label={`دسته‌بندی: ${category}`}>
              {category}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span className="text-gray-600 mr-2" aria-label={`تاریخ سررسید: ${formattedDueDate}`}>
              {formattedDueDate}
            </span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span className="text-gray-600 mr-2" aria-label={`تاریخ ایجاد: ${formattedCreatedDate}`}>
              {formattedCreatedDate}
            </span>
          </div>
        </div>
      </article>
    </Block>
  );
});

export default TaskItem;
