// imports
const express = require("express");
const router = express.Router();
const { getTasks, getUserTasks, addTask } = require("../controllers/dashboard");

// routes
router.route("/api/dashboard").get(getTasks);
router.route("/api/dashboard/:id").get(getUserTasks);
router.route("/api/dashboard/:id").post(addTask);

module.exports = router;
