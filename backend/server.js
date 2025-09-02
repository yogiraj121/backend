const express = require("express");const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./src/db");

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());

connectDB();

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// Routes
const studentsRouter = require("./students/routes");
const uploadsRouter = require("./uploads/routes");
app.use("/api/students", studentsRouter);
app.use("/api/uploads", uploadsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
