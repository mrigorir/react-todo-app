import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { setTodoAction, clearCompletedAction } from '../../redux/todos/todos';

function FormTodo() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const handleDescription = () => {
    setDescription(descriptionRef.current.value);
  };

  const handleTitle = () => {
    setTitle(titleRef.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTodoAction(title, description));
    setTitle('');
    setDescription('');
  };

  return (
    <div className="w-75">
      <div className="border border-2 border-secondary my-5"> </div>
      <Form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-between">
        <Form.Control
          type="text"
          className="fs-6 formTitle w-25 mx-3"
          ref={titleRef}
          placeholder="Task Owner"
          value={title}
          onChange={handleTitle}
          required
        />
        <Form.Control
          as="textarea"
          rows="1"
          className="fs-6 formDesc w-50 mx-3"
          placeholder="Task description"
          ref={descriptionRef}
          value={description}
          onChange={handleDescription}
        />
        <Button
          variant="success"
          type="submit"
          className="fs-6 mx-3 w-25"
        >
          Create
        </Button>
        <Button
          variant="outline-secondary"
          type="button"
          className="fs-6 mx-3 w-25"
          onClick={() => dispatch(clearCompletedAction())}
        >
          Clear all Completed todos
        </Button>
      </Form>
    </div>
  );
}

export default FormTodo;
