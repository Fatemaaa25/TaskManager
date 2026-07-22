import { useState } from "react";
import axios from "axios";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (title === "") {
      alert("Title Required");

      return;
    }

    await axios.post("http://localhost:5000/tasks", {
      title,
      description,
    });

    setTitle("");
    setDescription("");

    fetchTasks();
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add Task</button>
    </form>
  );
}

export default TaskForm;
