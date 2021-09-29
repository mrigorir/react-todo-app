import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Todo from './Todo';

function TodoList({
  todos, backGround, droppableProps, innerRef, placeholder,
}) {
  return (
    <ul {...droppableProps} ref={innerRef} className={backGround}>
      {todos.map((todo, index) => {
        const {
          id, title, description, completed, avatar,
        } = todo;
        return (
          <Draggable key={id} draggableId={id} index={index}>
            {(provided) => {
              const { draggableProps, innerRef, dragHandleProps } = provided;
              return (
                <Todo
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  completed={completed}
                  avatar={avatar}
                  draggableProps={draggableProps}
                  innerRef={innerRef}
                  dragHandleProps={dragHandleProps}
                />
              );
            }}
          </Draggable>
        );
      })}
      {placeholder}
    </ul>
  );
}

TodoList.defaultProps = {
  droppableProps: '',
  placeholder: '',
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object]),
  ).isRequired,
  droppableProps: PropTypes.instanceOf(Object),
  placeholder: PropTypes.instanceOf(Object),
  innerRef: PropTypes.func.isRequired,
  backGround: PropTypes.string.isRequired,
};

export default TodoList;
