import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import hooks from '../../hooks/hooks';
import TodoList from '../todos/TodoList';
import Form from '../todos/Form';
import { reorderTodoAction } from '../../redux/todos/todos';
import '../../styles/todoList.css';

export default function Home() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [backGround, setBackGround] = useState('bg-white');

  hooks();

  const handleDragEnd = (result) => {
    setBackGround('bg-white');
    if (!result.destination) return;
    dispatch(reorderTodoAction(result));
  };

  const handleDragStart = () => {
    setBackGround('bg-warning');
  };

  return (
    <div>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)} onDragStart={handleDragStart}>
        <Droppable droppableId="todos">
          {(provided) => {
            const { droppableProps, innerRef, placeholder } = provided;
            return (
              <TodoList
                todos={todos}
                backGround={backGround}
                droppableProps={droppableProps}
                innerRef={innerRef}
                placeholder={placeholder}
              />
            );
          }}
        </Droppable>
      </DragDropContext>
      <Form />
    </div>
  );
}
