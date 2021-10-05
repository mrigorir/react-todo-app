import { v4 as uuidv4 } from 'uuid';
import {
  setTodo, toggleTodo, editTodo, removeTodo, reorderTodo,
  draggingTodo,
} from './logic';
import getImages from '../../services/apiResources';

const GET_TODOS = 'app/todos/GET_TODOS';
const SET_TODO = 'app/todos/SET_TODO';
const TOGGLE_TODO = 'app/todos/TOGGLE_TODO';
const CLEAR_COMPLETED = 'app/todos/CLEAR_COMPLETED';
const EDIT_TODO = 'app/todos/EDIT_TODO';
const REMOVE_TODO = 'app/todos/REMOVE_TODO';
const REORDER_TODO = 'app/todos/REORDER_TODO';
const DRAG_START = 'app/todos/DRAG_START';
const DRAG_END = 'app/todos/DRAG_END';

const getTodosAction = (storedTodos) => (
  {
    type: GET_TODOS,
    payload: storedTodos,
  }
);

const setTodoAction = (title, description) => async (dispatch) => {
  const images = await getImages();

  dispatch({
    type: SET_TODO,
    payload: {
      id: uuidv4(),
      title,
      description,
      avatar: images[Math.floor(Math.random() * (20))].url,
      completed: false,
      border: 'border-0',
      backGround: 'bg-white',
    },
  });
};

const toggleTodoAction = (id) => (
  {
    type: TOGGLE_TODO,
    payload: id,
  }
);

const editTodoAction = (id, title, description) => (
  {
    type: EDIT_TODO,
    payload: {
      id,
      title,
      description,
    },
  }
);

const removeTodoAction = (id) => (
  {
    type: REMOVE_TODO,
    payload: id,
  }
);

const clearCompletedAction = () => (
  {
    type: CLEAR_COMPLETED,
  }
);

const reorderTodoAction = (result) => (
  {
    type: REORDER_TODO,
    payload: result,
  }
);

const dragStartAction = (id) => (
  {
    type: DRAG_START,
    payload: id.draggableId,
  }
);

const dragEndAction = (id) => (
  {
    type: DRAG_END,
    payload: id.draggableId,
  }
);

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TODO:
      return setTodo(state, action.payload);
    case GET_TODOS:
      return [...state, ...action.payload];
    case TOGGLE_TODO:
      return toggleTodo(state, action.payload);
    case EDIT_TODO:
      return editTodo(state, action.payload.id, action.payload.title, action.payload.description);
    case REMOVE_TODO:
      return removeTodo(state, action.payload);
    case CLEAR_COMPLETED:
      return removeTodo(state);
    case REORDER_TODO:
      return reorderTodo(state, action.payload);
    case DRAG_START:
      return draggingTodo(state, action.payload);
    case DRAG_END:
      return draggingTodo(state, action.payload);
    default:
      return state;
  }
};

export {
  setTodoAction, getTodosAction, toggleTodoAction,
  editTodoAction, clearCompletedAction, removeTodoAction,
  reorderTodoAction, todosReducer, dragStartAction,
  dragEndAction,
};
