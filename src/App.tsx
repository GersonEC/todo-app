import React, {useCallback, useReducer, useEffect, useRef, useState} from "react";
import { useTodos } from './useTodos';

const Heading = (props: { title: string }) => {
  return (
    <h2>
      <p>{props.title}</p>
    </h2>
  );
};

function UL<T>({ items, render, itemClick }: {
  items: T[],
  itemClick: (item: T) => void;
  render: (item: T) => React.ReactNode;
}) {
  return(
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => itemClick(item)}>{render(item)}</li>
      ))}
    </ul>
  )
}

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
      <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={ (todo) => (
          <>
            {todo.text}
            <button
              onClick={() => removeTodo(todo.id)
              }
            >
              Remove
            </button>
          </>
        )}
      />
    
    </div>
  );
}

export default App;
