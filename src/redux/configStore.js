import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { todosReducer } from './todos/todos';

const reducer = combineReducers({
  todos: todosReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger)));

export default store;
