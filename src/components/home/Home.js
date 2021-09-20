import React from 'react';
import { useSelector } from 'react-redux';
import hooks from '../../hooks/hooks';
import { DragDropContext, Dropable } from 'react-beautiful-dnd';
import TodoList from '../todos/TodoList';
import Form from '../todos/Form';

export default function Home() {
  const todos = useSelector((state) => state.todos);

  hooks();

  return (
    <div>
      <DragDropContext>
      <Droppable droppableId="characters">
    {(provided) => (
      <TodoList todos={todos} provided={provided}/>
    )}
  </Droppable>
      </DragDropContext>
      <Form />
    </div>
  );
}
