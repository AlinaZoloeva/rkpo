import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортируем createRoot из react-dom/client
import App from './App';
import './index.css';

// Получаем элемент DOM, в который будем рендерить приложение
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение с помощью createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
