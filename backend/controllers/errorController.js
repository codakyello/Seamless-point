// errorController.js

const AppError = require("../utils/AppError");

// Handle MongoDB duplicate key error
const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue;
  const message = `Duplicate field value: ${JSON.stringify(
    value
  )}. Please use another value!`;
  return new AppError(message, 400);
};

// Handle MongoDB validation errors
const handleValidationErrorDB = (err) => {
  console.log("validation Error");
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

// Handle MongoDB cast errors (wrong data types in queries)
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Main error-handling middleware
module.exports = (err, req, res, next) => {
  console.log("in error");

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    console.log("in development");
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.create(
      Object.getPrototypeOf(err),
      Object.getOwnPropertyDescriptors(err)
    );

    // Handle MongoDB errors
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error); // MongoDB duplicate key error
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    console.log("here");

    // Check if the error is operational
    if (error.isOperational) {
      console.log("here1");

      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    } else {
      // Programming or other unknown error
      res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  }
};
