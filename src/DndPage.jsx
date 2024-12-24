// src/DndPage.jsx
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';
import './DndPage.css';

const ItemType = 'CARD';

// Компонент для перетаскиваемой карточки
function DraggableCard({ item, index, moveTaskWithinColumn, columnId, removeCard }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: item.id, index, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover(draggedItem) {
      if (draggedItem.columnId === columnId && draggedItem.index !== index) {
        moveTaskWithinColumn(columnId, draggedItem.index, index);
        draggedItem.index = index; // Обновляем текущий индекс перемещаемой задачи
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="dnd-item"
      style={{ opacity }}
    >
      {item.content}
      <button onClick={() => removeCard(columnId, index)}>Удалить</button>
    </div>
  );
}

// Компонент для колонки
function DroppableColumn({ column, columnId, moveTaskWithinColumn, removeCard }) {
  const [, drop] = useDrop({
    accept: ItemType,
    hover: () => {}, // Пустая функция, чтобы DropTarget работал
  });

  return (
    <div ref={drop} className="dnd-column">
      <h2>{column.name}</h2>
      {column.items.map((item, index) => (
        <DraggableCard
          key={item.id}
          item={item}
          index={index}
          moveTaskWithinColumn={moveTaskWithinColumn}
          columnId={columnId}
          removeCard={removeCard}
        />
      ))}
    </div>
  );
}

function DndPage() {
  const [columns, setColumns] = useState({
    todo: {
      name: 'To Do',
      items: [
        { id: '1', content: 'Купить продукты' },
        { id: '2', content: 'Прочитать книгу 1' },
        { id: '3', content: 'Прочитать книгу 2' },
        { id: '4', content: 'Прочитать книгу 3' },
      ],
    },
    inProgress: {
      name: 'In Progress',
      items: [],
    },
    done: {
      name: 'Done',
      items: [],
    },
    blocked: {
      name: 'Blocked',
      items: [],
    },
  });

  // Функция для перемещения задачи внутри одной колонки
  const moveTaskWithinColumn = (columnId, sourceIndex, targetIndex) => {
    const column = columns[columnId];
    const updatedItems = [...column.items];

    // Перемещаем задачу
    const [movedItem] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(targetIndex, 0, movedItem);

    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems,
      },
    });
  };

  const removeCard = (columnId, cardIndex) => {
    const newColumns = { ...columns };
    newColumns[columnId].items.splice(cardIndex, 1);
    setColumns(newColumns);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dnd-container">
        <Link to="/" className="nav-button">Назад к To-Do List</Link>
        {Object.entries(columns).map(([columnId, column]) => (
          <DroppableColumn
            key={columnId}
            column={column}
            columnId={columnId}
            moveTaskWithinColumn={moveTaskWithinColumn}
            removeCard={removeCard}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default DndPage;