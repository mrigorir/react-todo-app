import { v4 as uuidv4 } from 'uuid';

const GET_TODOS = 'app/todos/GET_TODOS';
const SET_TODO = 'app/todos/SET_TODO';
const TOGGLE_TODO = 'app/todos/TOGGLE_TODO';
let newTodos = '';
let toggledTodo = '';

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

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TODO:
      return [...state, action.payload];
    case GET_TODOS:
      return [...state, ...action.payload];
    case TOGGLE_TODO:
      newTodos = [...state];
      toggledTodo = newTodos.find((todo) => todo.id === action.payload);
      toggledTodo.completed = !toggledTodo.completed;
      return [...newTodos];
    default:
      return state;
  }
};

export {
  setTodoAction, getTodosAction, toggleTodoAction, todosReducer,
};
