import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleTodoAction, editTodoAction, removeTodoAction } from '../../redux/todos/todos';

function Todo({
  id, title, description, completed, avatar, draggableProps, innerRef, dragHandleProps,
}) {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const descRef = useRef();
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);
  const [show, setShow] = useState('opacity-0');

  const handleValues = () => {
    setEditTitle(titleRef.current.value);
    setEditDesc(descRef.current.value);
  };

  const handleKey = (e) => {
    setShow('opacity-100 d-block mt-3');
    if (e.key === 'Enter') {
      dispatch(editTodoAction(id, editTitle, editDesc));
      setShow('opacity-0');
    }
    if (e.key === 'Backspace') setShow('opacity-100 d-block mt-3');
  };

  return (
    <li id={id} ref={innerRef} {...draggableProps} {...dragHandleProps}>
      <img src={avatar} alt="user" height="100" width="100" className="rounded img-fluid" />
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
      <br />
      <span className={show}>
        <FontAwesomeIcon icon={['fas', 'cog']} size="1x" spin className="me-2 text-primary" />
        Editing...press
        <FontAwesomeIcon icon={['fas', 'arrow-right']} size="1x" className="mx-2 text-success" />
        to submit changes.
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
  avatar: PropTypes.string.isRequired,
  innerRef: PropTypes.func.isRequired,
  draggableProps: PropTypes.instanceOf(Object),
  dragHandleProps: PropTypes.instanceOf(Object),
};

export default Todo;
