const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

//MIDDLEWARE TO CHECK AUTHENTICATION
const isAuthenticated = require("../middleware/Auth");

//CREATE A NEW TASK
router.post("/tasks", isAuthenticated, TaskController.cre);
