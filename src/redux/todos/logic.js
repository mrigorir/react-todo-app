const findTodo = (state, id, title = '', description = '') => {
  const newTodos = [...state];
  const todo = newTodos.find((todo) => todo.id === id);

  if (title === '' && description === '') todo.completed = !todo.completed;
  todo.title = title;
  todo.description = description;

  return [...newTodos];
};

const removeTodo = (state, id = '') => {
  if (id === '') return [...state.filter((todos) => todos.completed === false)];
  return [...state.filter((todo) => todo.id !== id)];
};

export { findTodo, removeTodo };
