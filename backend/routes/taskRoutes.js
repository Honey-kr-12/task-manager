const auth = require("../middleware/authMiddleware");
const Task = require("../models/Task");
const express = require("express");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.userId,
  });

  res.json(task);
});

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.userId });
  res.json(tasks);
});

router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );

  res.json(updated);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });

  res.json({ message: "Task Deleted" });
});

module.exports = router;