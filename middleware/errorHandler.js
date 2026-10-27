module.exports = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(400).json({ error: "Email already exists" });
  }

  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: "Validation failed", details });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON in request body" });
  }

  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server" });
};