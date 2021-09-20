import React from 'react';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import hooks from '../../hooks/hooks';
import TodoList from '../todos/TodoList';
import Form from '../todos/Form';

export default function Home() {
  const todos = useSelector((state) => state.todos);

  hooks();

  return (
    <div>
      <DragDropContext>
        <Droppable droppableId="characters">
          {(provided) => {
            const { droppableProps, innerRef } = provided;
            return (
              <TodoList todos={todos} droppableProps={droppableProps} innerRef={innerRef} />
            );
          }}
        </Droppable>
      </DragDropContext>
      <Form />
    </div>
  );
}
