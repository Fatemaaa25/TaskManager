import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/tasks");

      setTasks(res.data);

      setError("");
    } catch (err) {
      setError("Unable to connect to server.", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.is_completed;

    if (filter === "active") return !task.is_completed;

    return true;
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <TaskForm fetchTasks={fetchTasks} />

      {loading && <h2>Loading...</h2>}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>

        <button onClick={() => setFilter("active")}>Active</button>

        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {error && <h2>{error}</h2>}

      {!loading && !error && (
        <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
      )}
    </div>
  );
}

export default App;
