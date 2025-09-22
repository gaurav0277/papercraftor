const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri =
  process.env.MONGO_URI ||
  "";
mongoose
  .connect(mongoUri, { autoIndex: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo connection error", err));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/projects", require("./routes/projects"));
app.use("/api/export", require("./routes/export"));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on :${port}`));


