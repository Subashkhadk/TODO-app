const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

// Home
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

// Users
app.get("/users", (req,res) => { 
  res.json([
    {id: 1, name: "Subash" },
    {id: 2, name:"Ram" }
  ]);
});

// TODOS
app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  todos = todos.filter(todo => todo.id != id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});