/* =============== IMPORTS =============== */
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Education, Skill, Project, User } = require("../models/model");

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

/* =============== ADMIN CONTROLLERS =============== */

// REGISTER
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });

    if (existing) {
      res.status(400).json({ sucess: false, message: "Admin already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ username, password: hashedPassword });
    res
      .status(201)
      .json({ success: true, message: "Admin registered successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // --- INPUT VALIDATION ---
    if (!username || !password) {
      res.status(400).json({
        status: false,
        message: "Username and password are required.",
      });
    }

    // --- FIND USER ---
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ status: false, message: "Invalid credentials." });
    }

    // --- PASSWORD CHECK ---
    const isPassowrdMatch = await bcrypt.compare(password, user.password);
    if (!isPassowrdMatch) {
      res.status(400).json({ status: false, message: "Invalid credentials." });
    }

    // --- JWT GENERATE ---
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // --- COOKIE SETUP ---
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGOUT
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET-ME
const getMe = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
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
  register,
  login,
  logout,
  getMe,
};
