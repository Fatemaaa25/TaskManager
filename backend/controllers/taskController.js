const db = require("../config/db");

const getTasks = (req, res) => {
  const sql = "SELECT * FROM tasks ORDER BY created_at DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

const addTask = (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({
      message: "Title Required",
    });
  }

  const sql = "INSERT INTO tasks(title,description) VALUES(?,?)";

  db.query(sql, [title, description], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Task Added Successfully",
    });
  });
};

const updateTask = (req, res) => {
  const id = req.params.id;

  const sql = "UPDATE tasks SET is_completed = NOT is_completed WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Task Updated",
    });
  });
};

const deleteTask = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM tasks WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Task Deleted",
    });
  });
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};
