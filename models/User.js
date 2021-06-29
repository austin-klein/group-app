// imports
const mongoose = require("mongoose");

// model
const UserSchema = new mongoose.Schema({
    groupId: String,
    name: String,
});

module.exports = mongoose.model("User", UserSchema);