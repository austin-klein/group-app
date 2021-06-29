// imports
const { CustomError } = require("../errors/custom-err");

// error handler function
function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    console.log(err);
    return res.status(err.status).json({ msg: err.message })
}

module.exports = errorHandler;