import React, { memo, useMemo } from 'react';
import Block from '../layout/block';
import NumberBlock from './numberBlock';
import { TaskItemType } from '../../types/tasks';
import { countTasksByStatus } from '../../utils/list';

type OverviewProps = {
  taskList: TaskItemType[];
};

const Overview = memo(function Overview({ taskList }: OverviewProps) {
  const stats = useMemo(() => ({
    total: taskList?.length || 0,
    notStarted: countTasksByStatus(taskList, 'notStarted'),
    inProgress: countTasksByStatus(taskList, 'inProgress'),
    done: countTasksByStatus(taskList, 'done'),
  }), [taskList]);

  return (
    <Block>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold" id="overview-title">نمای کلی</h2>
        <div
          className="grid grid-cols-4 gap-4"
          role="group"
          aria-labelledby="overview-title"
          aria-label="آمار وظایف"
        >
          <NumberBlock
            number={stats.total}
            title="مجموع"
            color="blue"
          />
          <NumberBlock
            number={stats.notStarted}
            title="در انتظار"
            color="yellow"
          />
          <NumberBlock
            number={stats.inProgress}
            title="در حال انجام"
            color="green"
          />
          <NumberBlock
            number={stats.done}
            title="تکمیل شده"
            color="red"
          />
        </div>
      </div>
    </Block>
  );
});

export default Overview;
