import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTodoAction } from '../../redux/todos/todos';

function Form() {
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
    <form onSubmit={handleSubmit}>
      <input type="text" ref={titleRef} placeholder="title" value={title} onChange={handleTitle} required />
      <textarea
        ref={descriptionRef}
        value={description}
        onChange={handleDescription}
        required
      />
      <button type="submit"> Create </button>
      <button type="button"> Clear all Completed todos </button>
    </form>
  );
}

export default Form;
