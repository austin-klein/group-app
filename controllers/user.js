// imports
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-err");
const User = require("../models/User");

// get user function
exports.getUsers = asyncWrapper(async (req, res, next) => {
    const groupId = "60da280c65c5d676c817cd79"; // get from req

    const users = await User.find({ groupId: groupId });
    if (!users) {
        return next(createCustomError("No Users Found", 404))
    }

    res.status(200).json({ msg: "Users Successfully Found", users });
});

// add user function
exports.addUser = asyncWrapper(async (req, res, next) => {
    const { groupId, name } = req.body;

    const user = await User.create({
        groupId, name
    });
    if (!user) {
        return next(createCustomError("User Not Created", 500))
    };

    res.status(201).json({ msg: "User Successfully Created" });
});
