import { TaskItemType } from '../types/tasks';

export const countTasksByStatus = (tasks: TaskItemType[], status: string) => {
  return tasks.filter(task => task.status === status).length;
};
