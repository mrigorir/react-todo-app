import React from 'react';
import { useSelector } from 'react-redux';
import hooks from '../../hooks/hooks';
import TodoList from '../todos/TodoList';
import Form from '../todos/Form';

export default function Home() {
  const todos = useSelector((state) => state.todos);

  hooks();

  return (
    <div>
      <TodoList todos={todos} />
      <Form />
    </div>
  );
}
