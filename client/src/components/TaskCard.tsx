import React from 'react';

interface Task {
  id: string;
  title: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white p-3 rounded-md shadow-sm cursor-pointer">
      <p>{task.title}</p>
    </div>
  );
};

export default TaskCard;