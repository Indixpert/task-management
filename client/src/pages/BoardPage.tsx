import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import TaskCard from '../components/TaskCard';

interface Task {
  id: string;
  title: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface BoardData {
  id: string;
  title: string;
  columns: Column[];
}

const BoardPage: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [board, setBoard] = useState<BoardData | null>(null);

  useEffect(() => {
    if (boardId) {
      api.get(`/boards/${boardId}`).then(response => {
        setBoard(response.data);
      });
    }
  }, [boardId]);

  if (!board) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">{board.title}</h1>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {board.columns.map(column => (
          <div key={column.id} className="bg-gray-200 rounded-lg p-3 w-72 flex-shrink-0">
            <h2 className="font-bold mb-3">{column.title}</h2>
            <div className="space-y-3">
              {column.tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;