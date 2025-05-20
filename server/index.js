const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");  // <-- add this
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

// Serve React build files (static)
app.use(express.static(path.join(__dirname, "../client/dist")));  // adjust if your build folder is different

// Catch all other requests and send React index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
