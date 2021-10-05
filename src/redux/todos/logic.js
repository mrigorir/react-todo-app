const setTodo = (state, payload) => {
  const todo = { ...payload };
  if (todo.description === '') todo.description = 'No description added.';
  return [...state, todo];
};

const findTodo = (state, id) => {
  const todo = state.find((todo) => todo.id === id);
  return todo;
};

const toggleTodo = (state, id) => {
  const todo = findTodo(state, id);
  todo.completed = !todo.completed;
  return [...state];
};

const editTodo = (state, id, title, description) => {
  const todo = findTodo(state, id);
  todo.title = title;
  todo.description = description;
  return [...state];
};

const removeTodo = (state, id = '') => {
  if (id === '') return [...state.filter((todos) => todos.completed === false)];
  return [...state.filter((todo) => todo.id !== id)];
};

const reorderTodo = (state, payload) => {
  const items = [...state];
  const [reorderedItem] = items.splice(payload.source.index, 1);

  items.splice(payload.destination.index, 0, reorderedItem);
  return items;
};

const draggingTodo = (state, id) => {
  const todo = findTodo(state, id);
  if (todo.border === 'border-purple' && todo.backGround === 'bg-todo') {
    todo.border = 'border-0';
    todo.backGround = 'bg-white';
    return [...state];
  }
  todo.border = 'border-purple';
  todo.backGround = 'bg-todo';
  return [...state];
};

export {
  setTodo, toggleTodo, editTodo, removeTodo,
  reorderTodo, draggingTodo,
};
