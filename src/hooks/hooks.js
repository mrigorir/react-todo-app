import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosAction } from '../redux/todos/todos';

const hooks = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const LOCAL_STORAGE_KEY = 'todos';

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) dispatch(getTodosAction(storedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
};

export default hooks;
