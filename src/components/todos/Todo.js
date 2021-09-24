import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleTodoAction, editTodoAction, removeTodoAction } from '../../redux/todos/todos';

function Todo({
  id, title, description, completed, draggableProps, innerRef, dragHandleProps,
}) {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const descRef = useRef();
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);
  const [show, setShow] = useState('d-none');

  const handleValues = () => {
    setEditTitle(titleRef.current.value);
    setEditDesc(descRef.current.value);
  };

  const handleKey = (e) => {
    setShow('d-block');
    if (e.key === 'Enter') {
      dispatch(editTodoAction(id, editTitle, editDesc));
      setShow('d-none');
    }
    if (e.key === 'Backspace') setShow('d-block');
  };

  return (
    <li id={id} ref={innerRef} {...draggableProps} {...dragHandleProps}>
      <input type="checkbox" checked={completed} onChange={() => dispatch(toggleTodoAction(id))} />
      <br />
      <label htmlFor="title">
        title:
        <input type="text" ref={titleRef} value={editTitle} onChange={handleValues} onKeyDown={handleKey} />
      </label>
      <br />
      <label htmlFor="description">
        description:
        <input type="text" ref={descRef} value={editDesc} onChange={handleValues} onKeyDown={handleKey} />
      </label>
      <button type="button" onClick={() => dispatch(removeTodoAction(id))}>Remove</button>
      <span className={show}>
        <FontAwesomeIcon icon={['fas', 'cog']} size="1x" spin className="me-2 text-primary" />
        Editing...press enter to submit changes.
      </span>
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
