// imports
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-err");
const Group = require("../models/Group");

// register function
exports.register = asyncWrapper(async (req, res, next) => {
  const { groupName, password } = req.body;

  const group = await Group.create({
    groupName,
    password,
  });
  if (!group) {
    return next(createCustomError("Group Not Created", 500));
  }

  sendToken(group, 201, res);
});

// login function
exports.login = asyncWrapper(async (req, res, next) => {
  const { groupName, password } = req.body;

  const group = await Group.findOne({ groupName }).select("+password");
  if (!group) {
    return next(createCustomError("Group Not Found", 404)); // For production change to 401 and same message
  }

  const isMatch = await group.matchPasswords(password);
  if (!isMatch) {
    return next(createCustomError("Invalid Credintials, Not Authorized", 401));
  }

  sendToken(group, 200, res);
});

// function for getting JWT token
const sendToken = (group, statusCode, res) => {
  const token = group.getToken();
  res.status(statusCode).json({
    msg: "JWT Successfully Signed",
    token,
    group,
  });
};
