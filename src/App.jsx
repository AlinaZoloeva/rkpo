// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodoPage from './TodoPage';
import DndPage from './DndPage';
import './App.css'; // Подключаем файл стилей

function App() {
  return (
    <Router>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-button">To-Do List</Link>
          </li>
          <li>
            <Link to="/dnd" className="nav-button">DND Page</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/dnd" element={<DndPage />} />
      </Routes>
    </Router>
  );
}

export default App;
