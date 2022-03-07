import React, {useCallback, useReducer, useRef} from "react";
import { useTodos } from './useTodos';

const Heading = (props: { title: string }) => {
  return (
    <h2>
      <p>{props.title}</p>
    </h2>
  );
};

function App() {
  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);
  const newTodoRef = useRef<HTMLInputElement>(null);
  const { todos, addTodo, removeTodo } = useTodos([
    {id: 0, text: 'Hey There', done: false}
  ])

  const onAddTodo = useCallback(() => {
    if(newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    <div style={{ backgroundColor: 'gray', height: '100vh'}}>
      <Heading title="Introduction" />
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button
            onClick={() => removeTodo(todo.id)
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
