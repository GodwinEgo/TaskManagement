const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

//MIDDLEWARE TO CHECK AUTHENTICATION
const isAuthenticated = require("../middleware/Auth");

//CREATE A NEW TASK
router.post("/tasks", isAuthenticated, TaskController.createTask);

//GET ALL TASKS FOR AUTHENTICATED USER
router.get("/tasks", isAuthenticated, TaskController.getAllTasks);

//GET A SINGLE TASK BY ID
router.get("/tasks/:taskId", isAuthenticated, TaskController.getTaskById);

//UPDATE A TASK BY ID
router.put("/tasks/:taskId", isAuthenticated, TaskController.updateTask);

//DELETE A TASK BY ID
router.delete("/tasks/:taskId", isAuthenticated, TaskController.deleteTask);

module.exports = router;
