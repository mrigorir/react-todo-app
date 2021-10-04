import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import hooks from '../../hooks/hooks';
import TodoList from '../todos/TodoList';
import FormTodo from '../todos/FormTodo';
import { reorderTodoAction } from '../../redux/todos/todos';
import '../../styles/todoList.css';

export default function Home() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [backGround, setBackGround] = useState('bg-gray');
  const [todoBackGround, setTodoBackGround] = useState('bg-white');

  hooks();

  const handleDragEnd = (result) => {
    setBackGround('bg-gray');
    setTodoBackGround('bg-white');
    if (!result.destination) return;
    dispatch(reorderTodoAction(result));
  };

  const handleDragStart = () => {
    setBackGround('bg-todoList');
    setTodoBackGround('bg-todo');
  };

  return (
    <div>
      <Container className="mb-5">
        <Row>
          <Col md={12} className="d-flex align-items-center justify-content-center">
            <DragDropContext
              onDragEnd={(result) => handleDragEnd(result)}
              onDragStart={handleDragStart}
            >
              <Droppable droppableId="todos">
                {(provided) => {
                  const { droppableProps, innerRef, placeholder } = provided;
                  return (
                    <TodoList
                      todos={todos}
                      backGround={backGround}
                      todoBackGround={todoBackGround}
                      droppableProps={droppableProps}
                      innerRef={innerRef}
                      placeholder={placeholder}
                    />
                  );
                }}
              </Droppable>
            </DragDropContext>
          </Col>
        </Row>
      </Container>
      <Container fluid className="d-flex align-items-center justify-content-center mt-5">
        <FormTodo />
      </Container>
    </div>
  );
}
