// imports
const mongoose = require('mongoose');

// connect to database
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://dbuser:passwrd123!@cluster0.8yh4l.mongodb.net/GroupApp?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });

    console.log('MongoDB connected');
};

module.exports = connectDB;


