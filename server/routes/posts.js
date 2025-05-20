const router = require("express").Router();
const Post = require("../models/Post");
const auth = require("../middleware/authMiddleware");

// Create post
router.post("/", auth, async (req, res) => {
  const { title, content, image } = req.body;

  try {
    const post = new Post({ title, content, image, author: req.userId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// Update post
router.put("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.userId)
      return res.status(403).json({ error: "Not authorized" });

    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.userId)
      return res.status(403).json({ error: "Not authorized" });

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
