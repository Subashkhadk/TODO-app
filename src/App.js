import { useState, useEffect } from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // GET todos
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // ADD todo
  const addTodo = () => {
    const newTodo = { id: Date.now(), text };

    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(data => {
        setTodos([...todos, data]);
        setText("");
      });
  };

  // DELETE todo
  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Todo App </h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTodo}>Add</button>

      {todos.map(todo => (
        <div key={todo.id}>
          <p>{todo.text}</p>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;