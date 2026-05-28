const mongoose = require("mongoose");

/* =============== EDUCATION SCHEMA =============== */
const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, required: true },
    order: { type: Number, default: 0 }, // for controlling display order
  },
  { timestamps: true },
);

/* =============== SKILL SCHEMA =============== */
const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g. "Backend", "Database", "Tools"
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

/* =============== PROJECT SCHEMA =============== */
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    githubLink: { type: String, default: "" },
    liveLink: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

/* =============== EXPORTS =============== */
const Education = mongoose.model("Education", educationSchema);
const Skill = mongoose.model("Skill", skillSchema);
const Project = mongoose.model("Project", projectSchema);

module.exports = { Education, Skill, Project };
