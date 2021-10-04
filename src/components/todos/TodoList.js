import { Draggable } from 'react-beautiful-dnd';
import { ListGroup, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Todo from './Todo';

function TodoList({
  todos, backGround, droppableProps, innerRef, placeholder, todoBackGround,
}) {
  if (todos.length === 0) return <Badge bg="secondary" className="my-5 fs-1" ref={innerRef}> No tasks submmited yet.</Badge>;
  return (
    <ListGroup {...droppableProps} ref={innerRef} className={`${backGround} border-0 my-5 py-2 px-3`}>
      {todos.map((todo, index) => {
        const {
          id, title, description, completed, avatar,
        } = todo;
        return (
          <Draggable key={id} draggableId={id} index={index}>
            {(provided) => {
              const { draggableProps, innerRef, dragHandleProps } = provided;
              return (
                <Todo
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  completed={completed}
                  avatar={avatar}
                  draggableProps={draggableProps}
                  innerRef={innerRef}
                  dragHandleProps={dragHandleProps}
                  todoBackGround={todoBackGround}
                />
              );
            }}
          </Draggable>
        );
      })}
      {placeholder}
    </ListGroup>
  );
}

TodoList.defaultProps = {
  droppableProps: '',
  placeholder: '',
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object]),
  ).isRequired,
  droppableProps: PropTypes.instanceOf(Object),
  placeholder: PropTypes.instanceOf(Object),
  innerRef: PropTypes.func.isRequired,
  backGround: PropTypes.string.isRequired,
  todoBackGround: PropTypes.string.isRequired,
};

export default TodoList;
