const Task = require("../models/Task");

//CREATE A NEW TASK
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    //validate input
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    //create a new task instance
    const task = new Task({ title, description, dueDate, user: req.user.id });

    //save the task to the database
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

//GET ALL TASKS FOR A SPECIFIC USER
const getAllTasks = async (req, res) => {
  try {
    //fetch all tasks for the authenticated user
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//GET A SINGLE TASK BY ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    //check if the task belongs to the authenticated user
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access Denied!!" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

//UPDATE A TASK BY ID
const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;

    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: "Task Not Found" });
    }
    //check if the task belongs to an authenticated user
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access Denied" });
    }
    //upadate task fields
    task.title = title;
    tasl.description = description;
    task.dueDate = dueDate;
    task.status = status;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//DELETE A TASK BY ID
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ error: "Task Not Found" });
    }
    //check if task belongs to authenticated user
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }
    await task.remove();
    res.json({ message: "Task Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
