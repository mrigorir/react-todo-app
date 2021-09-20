import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleTodoAction, editTodoAction, removeTodoAction } from '../../redux/todos/todos';

function Todo({
  id, title, description, completed, draggableProps, innerRef, dragHandleProps,
}) {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const descRef = useRef();
  const [edtiTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);

  const handleValues = () => {
    setEditTitle(titleRef.current.value);
    setEditDesc(descRef.current.value);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') dispatch(editTodoAction(id, edtiTitle, editDesc));
  };

  return (
    <li id={id} ref={innerRef} {...draggableProps} {...dragHandleProps}>
      <input type="checkbox" checked={completed} onChange={() => dispatch(toggleTodoAction(id))} />
      <br />
      <label htmlFor="title">
        title:
        <input type="text" ref={titleRef} value={edtiTitle} onChange={handleValues} onKeyPress={handleKey} />
      </label>
      <br />
      <label htmlFor="description">
        description:
        <input type="text" ref={descRef} value={editDesc} onChange={handleValues} onKeyPress={handleKey} />
      </label>
      <button type="button" onClick={() => dispatch(removeTodoAction(id))}>Remove</button>
    </li>
  );
}

Todo.defaultProps = {
  dragHandleProps: '',
  draggableProps: '',
};

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  innerRef: PropTypes.func.isRequired,
  draggableProps: PropTypes.instanceOf(Object),
  dragHandleProps: PropTypes.instanceOf(Object),
};

export default Todo;
