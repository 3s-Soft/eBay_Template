const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const templateRoutes = require("./routes/templateRoutes");
const libraryRoutes = require("./routes/libraryRoutes");
const bulkRoutes = require("./routes/bulkRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/bulk", bulkRoutes);

app.use(errorHandler);

module.exports = { app };
