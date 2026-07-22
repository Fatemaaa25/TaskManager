import axios from "axios";

function TaskItem({ task, fetchTasks }) {
  const complete = async () => {
    await axios.put(`http://localhost:5000/tasks/${task.id}`);

    fetchTasks();
  };

  const remove = async () => {
    await axios.delete(`http://localhost:5000/tasks/${task.id}`);

    fetchTasks();
  };

  return (
    <div className="task">
      <h3
        style={{
          textDecoration: task.is_completed ? "line-through" : "none",
        }}
      >
        {task.title}
      </h3>

      <p>{task.description}</p>

      <p>{task.is_completed ? "Completed" : "Pending"}</p>

      <button onClick={complete}>
        {task.is_completed ? "Undo" : "Complete"}
      </button>

      <button onClick={remove}>Delete</button>
    </div>
  );
}

export default TaskItem;
