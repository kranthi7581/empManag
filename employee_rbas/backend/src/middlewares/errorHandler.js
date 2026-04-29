module.exports = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(error.errors).map((item) => item.message),
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      message: "Duplicate value",
      fields: error.keyValue,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid resource identifier",
    });
  }

  console.error(error);

  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal server error",
  });
};
