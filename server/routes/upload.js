const express = require("express");
const router = express.Router();
const { upload } = require("../utils/cloudinary");

// POST /api/upload
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: "Image upload failed" });
  }

  res.status(200).json({ imageUrl: req.file.path }); // Cloudinary public URL
});

module.exports = router;
