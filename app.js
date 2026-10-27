const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Student Management API is running");
});

app.use("/students", studentRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

module.exports = app;