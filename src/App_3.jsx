// src/App.jsx
import React, { useState } from 'react';
import TodoList from './TodoList.jsx';
import './App.css'; // Импортируем файл со стилями

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Купить продукты', completed: false },
    { id: 2, title: 'Почитать книгу', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('все');

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = () => {
    switch (filter) {
      case 'выполненные':
        return todos.filter(todo => todo.completed);
      case 'активные':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="container">
      <h1 className="title">Мой список дел</h1>
      <form onSubmit={addTodo} className="form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Добавить новую задачу..."
          className="input"
        />
        <button type="submit" className="button">Добавить</button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('all')} className={`button ${filter === 'all' ? 'active' : ''}`}>all</button>
        <button onClick={() => handleFilterChange('done')} className={`button ${filter === 'done' ? 'active' : ''}`}>done</button>
        <button onClick={() => handleFilterChange('active')} className={`button ${filter === 'active' ? 'active' : ''}`}>active</button>
      </div>

      <TodoList todos={filteredTodos()} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;