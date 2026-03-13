import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Board {
  id: string;
  title: string;
}

const DashboardPage: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    api.get('/boards').then(response => {
      setBoards(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Boards</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map(board => (
          <Link to={`/board/${board.id}`} key={board.id} className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h2 className="font-semibold">{board.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;