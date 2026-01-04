import { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState(["Learn React", "Write Tests"]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, input]);
    setInput("");
  };

  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index
          ? { text: todo.text || todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        placeholder="Add todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo, index) => {
          const text = todo.text || todo;
          const completed = todo.completed;

          return (
            <li
              key={index}
              onClick={() => toggleTodo(index)}
              style={{
                textDecoration: completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {text}
              <button onClick={(e) => {
                e.stopPropagation();
                deleteTodo(index);
              }}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
