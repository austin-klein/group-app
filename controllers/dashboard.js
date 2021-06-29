const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-err");
const Task = require("../models/Task");

// get all tasks function
exports.getTasks = asyncWrapper(async (req, res, next) => {
  const { groupId } = req.query;

  const tasks = await Task.find({ groupId: groupId });
  if (!tasks) {
    return next(createCustomError("No Tasks Found", 404));
  }

  res.status(200).json({ msg: "Tasks Successfully Found", tasks });
});

// get user tasks function
exports.getUserTasks = asyncWrapper(async (req, res, next) => {
  const { userId } = req.query;

  const tasks = await Task.find({ userId: userId });
  if (!tasks) {
    return next(createCustomError("No Tasks Found", 404));
  }

  res.status(200).json({ msg: "Tasks Successfully Found", tasks });
});

// add task
exports.addTask = asyncWrapper(async (req, res, next) => {
  const { groupId, userId, owner, name } = req.body;
  const completed = false;
  const task = await Task.create({
    groupId,
    userId,
    owner,
    name,
    completed
  });

  if (!task) {
    return next(createCustomError("Task Not Created", 500));
  }

  res.status(201).json({ msg: "Task Successfully Created" });
});
