// imports
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");

// routes
router.route("/api/register").post(register);
router.route("/api/login").post(login);

module.exports = router;