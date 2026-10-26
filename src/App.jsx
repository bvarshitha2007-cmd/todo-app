
import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterButtons from "./components/FilterButtons";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(text) {
    const newTodo = {
      id: crypto.randomUUID(),
      text: text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <main className="app">
      <section className="todo-card">
        <p className="eyebrow">YOUR PERSONAL PLANNER</p>
        <h1>My Todo List ✨</h1>
        <p className="subtitle">
          Small steps make big things happen.
        </p>

        <TodoForm onAdd={addTodo} />

        <div className="list-heading">
          <h2>My Tasks</h2>
          <span>{remaining} left</span>
        </div>

        <FilterButtons
          filter={filter}
          setFilter={setFilter}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />

        <p className="footer-note">
          Stay focused, one task at a time 💜
        </p>
      </section>
    </main>
  );
}

export default App;
