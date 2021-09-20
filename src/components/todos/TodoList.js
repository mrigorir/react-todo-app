import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

function TodoList({ todos, provided }) {
  const {droppableProps, innerRef} = provided;
  return (
    <ul {...droppableProps} ref={innerRef}>
      {todos.map((todo) => {
        const {
          id, title, description, completed,
        } = todo;
        return (
          <Todo
            key={id}
            id={id}
            title={title}
            description={description}
            completed={completed}
          />
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object]),
  ).isRequired,
};

export default TodoList;
