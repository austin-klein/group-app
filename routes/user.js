// imports
const express = require("express");
const router = express.Router();
const { getUsers, addUser } = require("../controllers/user");

// routes
router.route("/api/users").get(getUsers);
router.route("/api/users").post(addUser);

module.exports = router;