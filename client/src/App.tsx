import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import BoardPage from './pages/BoardPage';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;