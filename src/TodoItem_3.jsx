// src/components/TodoItem.jsx
import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="checkbox"
      />
      <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>{todo.title}</span>
      <button onClick={() => deleteTodo(todo.id)} className="button delete-button">Delete</button>
    </div>
  );
}

export default TodoItem;