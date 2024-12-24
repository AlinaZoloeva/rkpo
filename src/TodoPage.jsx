// scr/ToDoPage.jsx
import React, { useState } from 'react';
import './TodoPage.css';

function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Купить продукты', completed: false },
    { id: 2, title: 'Прочитать книгу', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (todoTitle) => {
    const newTodoItem = {
      id: Date.now(),
      title: todoTitle,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>
      <form className="todo-form" onSubmit={handleAddTodo}>
        <input
          type="text"
          className="todo-input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Добавить новое задание..."
        />
        <button type="submit" className="todo-button">добавить</button>
      </form>
      <div className="todo-filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>все</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>активные</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>выполненные</button>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoPage;