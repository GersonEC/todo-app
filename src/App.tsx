import React, { useCallback, useRef } from "react";
import { useTodos, useAddTodo, useRemoveTodo, TodosProvider } from "./useTodos";

const Heading = (props: { title: string }) => {
  return (
    <h2>
      <p>{props.title}</p>
    </h2>
  );
};

function UL<T>({
  items,
  render,
  itemClick,
}: {
  items: T[];
  itemClick: (item: T) => void;
  render: (item: T) => React.ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => itemClick(item)}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);
  const newTodoRef = useRef<HTMLInputElement>(null);

  const todos = useTodos();
  const addTodo = useAddTodo();
  const removeTodo = useRemoveTodo();

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    <div style={{ backgroundColor: "gray", height: "100vh" }}>
      <Heading title="Introduction" />
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
      <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => (
          <>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </>
        )}
      />
    </div>
  );
}

const JustShowTodos = () => {
  const todos = useTodos();
  return (
    <UL
      items={todos}
      itemClick={(item) => alert(item.id)}
      render={(todo) => <>{todo.text}</>}
    />
  );
};

const AppWrapper = () => (
  <TodosProvider initialTodos={[{ id: 0, text: "Hey There", done: false }]}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
      }}
    >
      <App></App>
      <JustShowTodos />
    </div>
  </TodosProvider>
);
export default AppWrapper;
