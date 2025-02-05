// src/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem.jsx';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
}

export default TodoList;