const express = require("express");
const router = express.Router();

router.post("/pdf", async (req, res) => {
  try {
    res.status(501).json({ error: "PDF export not implemented yet" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;


