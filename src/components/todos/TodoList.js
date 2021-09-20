import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Todo from './Todo';

function TodoList({ todos, droppableProps, innerRef }) {
  return (
    <ul {...droppableProps} ref={innerRef}>
      {todos.map((todo, index) => {
        const {
          id, title, description, completed,
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
                  draggableProps={draggableProps}
                  innerRef={innerRef}
                  dragHandleProps={dragHandleProps}
                />
              );
            }}
          </Draggable>
        );
      })}
    </ul>
  );
}

TodoList.defaultProps = {
  droppableProps: '',
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object]),
  ).isRequired,
  droppableProps: PropTypes.instanceOf(Object),
  innerRef: PropTypes.func.isRequired,
};

export default TodoList;
