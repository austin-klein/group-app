// imports
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// model
const GroupSchema = new mongoose.Schema({
    groupName: String,
    password: String
});

// hashing password
GroupSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// checking password for login
GroupSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// assigning jwt token
const jwtSecret = "1ic4EhnO1R6NkwSZtq75GzzjHIIv51VAM84IpEYRhYWyClEk83syiixfKilQ";
GroupSchema.methods.getToken = function () {
    return jwt.sign({ id: this._id }, jwtSecret, { expiresIn: "10min" })
};

module.exports = mongoose.model("Group", GroupSchema);