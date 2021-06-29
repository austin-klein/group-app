// imports
const mongoose = require("mongoose");

// model
const TaskSchema = new mongoose.Schema({
  groupId: String,
  userId: String,
  owner: String,
  name: String,
  completed: Boolean,
});

module.exports = mongoose.model("Task", TaskSchema);
