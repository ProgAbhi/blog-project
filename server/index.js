const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const uploadRoutes = require("./routes/upload");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running on port", process.env.PORT);
    });
  })
  .catch(err => console.log(err));
