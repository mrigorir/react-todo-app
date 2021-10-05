import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import hooks from '../../hooks/hooks';
import TodoList from '../todos/TodoList';
import FormTodo from '../todos/FormTodo';
import { reorderTodoAction, dragStartAction, dragEndAction } from '../../redux/todos/todos';
import '../../styles/todoList.css';

export default function Home() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [listBackGround, setListBackGround] = useState('bg-gray');

  hooks();

  const handleDragEnd = (result) => {
    setListBackGround('bg-gray');
    if (!result.destination) return;
    dispatch(reorderTodoAction(result));
    dispatch(dragEndAction(result));
  };

  const handleDragStart = (id) => {
    setListBackGround('bg-todoList');
    dispatch(dragStartAction(id));
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
                      listBackGround={listBackGround}
                      droppableProps={droppableProps}
                      innerRef={innerRef}
                      placeholder={placeholder}
                      dragStart={handleDragStart}
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
