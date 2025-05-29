const errorMiddleware = (err, req, res, next) => {
  try {
    // Default error
    let error = {
      statusCode: err.statusCode || 500,
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    };

    // Mongoose validation error
    if (err.name === "ValidationError") {
      error.statusCode = 400;
      error.message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
      error.statusCode = 400;
      const field = Object.keys(err.keyValue)[0];
      error.message = `Duplicate value for ${field}.`;
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === "CastError") {
      error.statusCode = 400;
      error.message = `Invalid ${err.path}: ${err.value}`;
    }

    // MongoDB connection error
    if (err.name === "MongoServerError") {
      error.statusCode = 500;
      error.message = "Database connection error. Please try again later.";
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
      error.statusCode = 401;
      error.message = "Invalid token. Please log in again.";
    }

    if (err.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Token has expired. Please log in again.";
    }

    // Send response
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default errorMiddleware;
