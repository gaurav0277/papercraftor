const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  affiliation: String,
  email: String,
  orcid: String
}, { _id: false });

const SectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, default: "" }
}, { _id: false });

const ReferenceSchema = new mongoose.Schema({
  type: { type: String, default: "article" },
  authors: { type: [String], default: [] },
  title: { type: String, required: true },
  journal: String,
  booktitle: String,
  year: { type: Number, required: true },
  volume: String,
  number: String,
  pages: String,
  doi: String
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  meta: {
    title: { type: String, required: true },
    authors: { type: [AuthorSchema], required: true },
    keywords: { type: [String], default: [] },
    template: { type: String, enum: ["ieee","springer"], default: "ieee" }
  },
  sections: { type: [SectionSchema], default: [] },
  acknowledgments: String,
  references: { type: [ReferenceSchema], default: [] },
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);


