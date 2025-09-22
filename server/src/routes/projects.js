const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  const list = await Project.find().sort({ updatedAt: -1 });
  res.json(list);
});

router.get("/:id", async (req, res) => {
  const p = await Project.findById(req.params.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});

router.put("/:id", async (req, res) => {
  try {
    const p = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;


