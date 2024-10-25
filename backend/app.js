const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const globalErrorHandler = require("../backend/controllers/errorController");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
// Global error handling middleware
app.use(globalErrorHandler);

app.use("/", (req, res) => {
  res.send("<h1>Deployment Check</h1>");
});
module.exports = app;
