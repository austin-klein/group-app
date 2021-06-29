// imports
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db");
const errorHandler = require("./middleware/error");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const notFound = require("./middleware/not-found");

// connect to database
connectDB();

// basic middleware
app.use(cors());
app.use(express.json());

// routes middleware
app.use(authRoutes);
app.use(userRoutes);

// not found & error middleware
app.use(notFound);
app.use(errorHandler);

//setup
app.listen(5000, () => console.log('server listening on port 5000'));

