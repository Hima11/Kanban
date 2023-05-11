import Dashboard from './Dashboard';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Kanban from './Kanban';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/kanban" element={<Kanban />} />
    </Routes>
  );
}

export default App;
