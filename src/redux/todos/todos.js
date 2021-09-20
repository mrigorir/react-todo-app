import { v4 as uuidv4 } from 'uuid';
import { findTodo, removeTodo } from './logic';

const GET_TODOS = 'app/todos/GET_TODOS';
const SET_TODO = 'app/todos/SET_TODO';
const TOGGLE_TODO = 'app/todos/TOGGLE_TODO';
const CLEAR_COMPLETED = 'app/todos/CLEAR_COMPLETED';
const EDIT_TODO = 'app/todos/EDIT_TODO';
const REMOVE_TODO = 'app/todos/REMOVE_TODO';

const getTodosAction = (storedTodos) => ({
  type: GET_TODOS,
  payload: storedTodos,
});

const setTodoAction = (title, description) => ({
  type: SET_TODO,
  payload: {
    id: uuidv4(),
    title,
    description,
    completed: false,
  },
});

const toggleTodoAction = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

const editTodoAction = (id, title, description) => ({
  type: EDIT_TODO,
  payload: {
    id,
    title,
    description,
  },
});

const removeTodoAction = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});

const clearCompletedAction = () => ({
  type: CLEAR_COMPLETED,
});

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TODO:
      return [...state, action.payload];
    case GET_TODOS:
      return [...state, ...action.payload];
    case TOGGLE_TODO:
      return findTodo(state, action.payload);
    case EDIT_TODO:
      return findTodo(state, action.payload.id, action.payload.title, action.payload.description);
    case REMOVE_TODO:
      return removeTodo(state, action.payload);
    case CLEAR_COMPLETED:
      return removeTodo(state);
    default:
      return state;
  }
};

export {
  setTodoAction, getTodosAction, toggleTodoAction,
  editTodoAction, clearCompletedAction, removeTodoAction,
  todosReducer,
};
