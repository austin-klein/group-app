// custom errors
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// function for creating custom errors
function createCustomError(message, statusCode) {
    return new CustomError(message, statusCode);
}

module.exports = { CustomError, createCustomError }