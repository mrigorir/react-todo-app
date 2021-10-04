import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Form, Badge, Image,
} from 'react-bootstrap';
import { toggleTodoAction, editTodoAction, removeTodoAction } from '../../redux/todos/todos';

function Todo({
  id, title, description, completed, avatar, draggableProps,
  innerRef, dragHandleProps, todoBackGround,
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
    <li
      id={id}
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className={`${todoBackGround} list-unstyled border-0 my-2 px-2`}
    >
      <div className="d-flex align-items-start justify-content-between mb-4">
        <Image rounded fluid src={avatar} alt="user" height="150" width="150" className="mt-2" />
        <Form.Control
          className="border-0 ms-2 fs-6 text-secondary d-flex align-items-center"
          as="textarea"
          rows={3}
          ref={descRef}
          value={editDesc}
          onChange={handleValues}
          onKeyDown={handleKey}
        />
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <Form.Label htmlFor="check" className="d-flex align-items-center justify-content-center mt-2">
          Done:
          <Form.Check
            checked={completed}
            onChange={() => dispatch(toggleTodoAction(id))}
            className="ms-2 fs-5"
            name="check"
          />
        </Form.Label>
        <Form.Control className="border-0 bg-title fs-6 text-secondary ms-4" type="text" ref={titleRef} value={editTitle} onChange={handleValues} onKeyDown={handleKey} />
        <Badge bg="danger" className="fs-5">
          <FontAwesomeIcon
            icon={['fas', 'trash-alt']}
            onClick={() => dispatch(removeTodoAction(id))}
          />
        </Badge>
      </div>
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
  todoBackGround: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  innerRef: PropTypes.func.isRequired,
  draggableProps: PropTypes.instanceOf(Object),
  dragHandleProps: PropTypes.instanceOf(Object),
};

export default Todo;
