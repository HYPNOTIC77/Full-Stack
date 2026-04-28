import { useEffect, useState } from "react";

const API_BASE = "/api";

async function parseJson(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }
  return response.status === 204 ? null : response.json();
}

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Loading...");
  const [error, setError] = useState("");

  const load = async () => {
    setError("");
    try {
      const health = await fetch(`${API_BASE}/health`).then(parseJson);
      setStatus(`Backend: ${health.status}`);

      const items = await fetch(`${API_BASE}/todos`).then(parseJson);
      setTodos(items);
    } catch (err) {
      setError(err.message || "Failed to load data");
      setStatus("Backend unreachable");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addTodo = async (event) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }
    setError("");
    try {
      const created = await fetch(`${API_BASE}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmed }),
      }).then(parseJson);
      setTodos((prev) => [...prev, created]);
      setTitle("");
    } catch (err) {
      setError(err.message || "Failed to add todo");
    }
  };

  const toggleTodo = async (id) => {
    setError("");
    try {
      const updated = await fetch(`${API_BASE}/todos/${id}/toggle`, {
        method: "PATCH",
      }).then(parseJson);
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    } catch (err) {
      setError(err.message || "Failed to toggle todo");
    }
  };

  const deleteTodo = async (id) => {
    setError("");
    try {
      await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" }).then(parseJson);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete todo");
    }
  };

  return (
    <main className="page">
      <section className="card">
        <h1>Exp9 Full-Stack Todo</h1>
        <p className="status">{status}</p>

        <form onSubmit={addTodo} className="todo-form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a task"
            maxLength={200}
          />
          <button type="submit">Add</button>
        </form>

        {error && <p className="error">{error}</p>}

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <button
                className={todo.completed ? "done" : ""}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.completed ? "✅" : "⬜"} {todo.title}
              </button>
              <button className="danger" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}