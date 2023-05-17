const express = require("express");

const {
  getAllTasks,
  createTask,
  deleteTask,
} = require("../controllers/tasks.js");
const router = express.Router();

/* Create */
router.post("/create", createTask);

/* Read */
router.get("/get-all/:userId", getAllTasks);

/* Delete */
router.delete("/delete/:id/:userId", deleteTask);

module.exports = router;
