import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleTodoAction } from '../../redux/todos/todos';

function Todo({
  id, title, description, completed,
}) {
  const dispatch = useDispatch();
  return (
    <li id={id}>
      <input type="checkbox" checked={completed} onChange={() => dispatch(toggleTodoAction(id))} />
      <br />
      <span>
        title:
        {title}
      </span>
      <br />
      <span>
        description:
        {description}
      </span>
    </li>
  );
}

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Todo;
