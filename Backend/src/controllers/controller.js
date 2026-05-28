const { Education, Skill, Project } = require("../models/model");

/* =============== EDUCATION CONTROLLERS =============== */

// READ EDUCATION
const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE EDUCATION
const createEducation = async (req, res) => {
  try {
    const { degree, institution, year, order } = req.body;
    const education = await Education.create({
      degree,
      institution,
      year,
      order,
    });
    res.status(201).json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE EDUCATION
const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!education)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE EDUCATION
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =============== SKILL CONTROLLERS =============== */

// READ SKILL
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE SKILL
const createSkill = async (req, res) => {
  try {
    const { name, category, order } = req.body;
    const skill = await Skill.create({ name, category, order });
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE SKILL
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE SKILL
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =============== PROJECT CONTROLLERS =============== */

// READ PROJECT
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      thumbnail,
      order,
    } = req.body;
    const project = await Project.create({
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      thumbnail,
      order,
    });
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE PROJECT
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =============== EXPORTS =============== */
module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
