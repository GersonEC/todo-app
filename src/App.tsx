import React, { useCallback, useRef } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import store, { selectTodos, addTodo, removeTodo } from "./store";
import { useTodos, TodosProvider } from "./useTodos";

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

const initialTodos = [
  {
    id: 0,
    text: "Hey There",
    done: false,
  },
];

function App() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const newTodoRef = useRef<HTMLInputElement>(null);

  // const { todos, addTodo, removeTodo } = useTodos(initialTodos);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch(addTodo(newTodoRef.current.value));
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

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
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </button>
          </>
        )}
      />
    </div>
  );
}

const JustShowTodos = () => {
  const todos = useSelector(selectTodos);
  return (
    <UL
      items={todos}
      itemClick={(item) => alert(item.id)}
      render={(todo) => <>{todo.text}</>}
    />
  );
};

{
  /*const AppWrapper = () => (
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
    )*/
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
        <App />
        <JustShowTodos />
      </div>
    </Provider>
  );
};
export default AppWrapper;
