'use client';

import React, { memo } from 'react';
import TaskItem from './taskItem';
import { useTaskFiltersContext } from '../../hooks/TaskFiltersContext';

const TasksList = memo(function TasksList() {
  const { filteredTasks: taskList } = useTaskFiltersContext();
  if (taskList.length === 0) {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <p className="text-gray-500">هیچ وظیفه‌ای یافت نشد.</p>
      </div>
    );
  }

  return (
    <section aria-label="لیست وظایف" role="list">
      {taskList.map(task => (
        <TaskItem
          key={task.taskId}
          taskId={task.taskId}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
          createdAt={task.createdAt}
          priority={task.priority}
          status={task.status}
          category={task.category}
        />
      ))}
    </section>
  );
});

export default TasksList;
