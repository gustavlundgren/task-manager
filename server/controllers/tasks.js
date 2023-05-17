const uniqid = require("uniqid");
const tasksDB = {
  data: require("../models/tasks.json"),
  setTasks: function (data) {
    this.data = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

/* Create */
const createTask = async (req, res) => {
  try {
    const { title, date, prio, userId } = req.body;

    if (!title || !date || !prio || !userId)
      return res.status(500).json({ message: "invalid info" });

    const newTask = { id: uniqid(), title, date, prio, userId };

    tasksDB.setTasks([...tasksDB.data, newTask]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "tasks.json"),
      JSON.stringify(tasksDB.data)
    );

    res.status(201).json(tasksDB.data.filter((t) => t.userId === userId));
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

/* Read */
const getAllTasks = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.status(404).json({ message: "no userId provided" });

    const data = tasksDB.data;

    const userTasks = data.filter((t) => t.userId === userId);

    res.status(200).json(userTasks);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

/* Delete */
const deleteTask = async (req, res) => {
  try {
    const { id, userId } = req.params;

    tasksDB.data = tasksDB.data.filter((t) => t.id !== id);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "tasks.json"),
      JSON.stringify(tasksDB.data)
    );

    res.status(200).json(tasksDB.data.filter((t) => t.userId === userId));
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { getAllTasks, createTask, deleteTask };
