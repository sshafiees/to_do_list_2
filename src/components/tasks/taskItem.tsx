import React, {
  memo,
  useMemo,
  useState,
  useCallback,
  useId,
  useEffect,
} from 'react';
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
import { useTaskFiltersContext } from '../../hooks/TaskFiltersContext';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const modalTitleId = useId();
  const modalDescId = useId();
  const deleteModalTitleId = useId();
  const deleteModalDescId = useId();
  const { actions } = useTaskFiltersContext();

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const openDeleteModal = useCallback(() => setIsDeleteOpen(true), []);
  const closeDeleteModal = useCallback(() => setIsDeleteOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isDeleteOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDeleteModal();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isDeleteOpen, closeDeleteModal]);
  const priorityTag = useMemo(() => priorityChip[priority]!, [priority]);
  const statusTag = useMemo(() => statusChip[status], [status]);

  const formattedDueDate = useMemo(
    () => dueDate.toLocaleDateString('fa-IR'),
    [dueDate]
  );
  const formattedCreatedDate = useMemo(
    () => createdAt.toLocaleDateString('fa-IR'),
    [createdAt]
  );

  return (
    <Block>
      <article role="listitem" aria-labelledby={`task-title-${taskId}`}>
        <div className="flex justify-between">
          <div className="flex gap-2 mb-2">
            <button
              id={`task-title-${taskId}`}
              type="button"
              className="font-bold text-right hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              onClick={openModal}
              aria-haspopup="dialog"
              aria-controls={`task-modal-${taskId}`}
            >
              {title}
            </button>
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
              onClick={openDeleteModal}
            >
              <TrashIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
        <p className="mb-2" id={`task-description-${taskId}`}>
          {description}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <FolderIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span
              className="text-gray-600 mr-2"
              aria-label={`دسته‌بندی: ${category}`}
            >
              {category}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarIcon
              className="h-4 w-4 text-gray-500"
              aria-hidden="true"
            />
            <span
              className="text-gray-600 mr-2"
              aria-label={`تاریخ سررسید: ${formattedDueDate}`}
            >
              {formattedDueDate}
            </span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <span
              className="text-gray-600 mr-2"
              aria-label={`تاریخ ایجاد: ${formattedCreatedDate}`}
            >
              {formattedCreatedDate}
            </span>
          </div>
        </div>
      </article>
      {isOpen && (
        <div
          id={`task-modal-${taskId}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          aria-describedby={modalDescId}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/30"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-lg shadow-xl w-[90vw] max-w-lg mx-auto p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 id={modalTitleId} className="text-lg font-bold">
                {title}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="بستن"
              >
                ×
              </button>
            </div>
            <div id={modalDescId} className="space-y-3">
              <p className="text-gray-700">{description}</p>
              <div className="flex flex-wrap gap-2">
                <Chip
                  label={priorityTag.label}
                  color={priorityTag.color}
                  textColor={priorityTag.textColor}
                />
                <Chip
                  label={statusTag.label}
                  color={statusTag.color}
                  textColor={statusTag.textColor}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <FolderIcon
                    className="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="mr-2">{category}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon
                    className="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="mr-2">{formattedDueDate}</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon
                    className="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="mr-2">{formattedCreatedDate}</span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="px-3 py-1.5 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={deleteModalTitleId}
          aria-describedby={deleteModalDescId}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/30"
            onClick={closeDeleteModal}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-lg shadow-xl w-[90vw] max-w-sm mx-auto p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 id={deleteModalTitleId} className="text-lg font-bold">
                حذف وظیفه
              </h3>
              <button
                type="button"
                onClick={closeDeleteModal}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="بستن"
              >
                ×
              </button>
            </div>
            <p id={deleteModalDescId} className="text-gray-700 mb-5">
              آیا از حذف «{title}» مطمئن هستید؟ این عمل قابل بازگشت نیست.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                انصراف
              </button>
              <button
                type="button"
                onClick={() => {
                  actions.deleteTask(taskId);
                  closeDeleteModal();
                }}
                className="px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-500"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </Block>
  );
});

export default TaskItem;
