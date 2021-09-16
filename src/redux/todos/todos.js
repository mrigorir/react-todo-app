import { v4 as uuidv4 } from 'uuid';

const GET_TODOS = 'app/todos/GET_TODOS';
const SET_TODO = 'app/todos/SET_TODO';
const TOGGLE_TODO = 'app/todos/TOGGLE_TODO';
const CLEAR_COMPLETED = 'app/todos/CLEAR_COMPLETED';
const EDIT_TODO = 'app/todos/EDIT_TODO';
let newTodos = '';
let todo = '';

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
      newTodos = [...state];
      todo = newTodos.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
      return [...newTodos];
    case EDIT_TODO:
      newTodos = [...state];
      todo = newTodos.find((todo) => todo.id === action.payload.id);
      todo.title = action.payload.title;
      todo.description = action.payload.description;
      return [...newTodos];
    case CLEAR_COMPLETED:
      return [...state.filter((todos) => todos.completed === false)];
    default:
      return state;
  }
};

export {
  setTodoAction, getTodosAction, toggleTodoAction,
  editTodoAction, clearCompletedAction, todosReducer,
};
