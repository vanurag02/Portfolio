const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/controller");
const protect = require("../middleware/authMiddleware");

/* =============== EDUCATION ROUTES =============== */
router.get("/education", getEducation);
router.post("/education", createEducation);
router.put("/education/:id", updateEducation);
router.delete("/education/:id", deleteEducation);

/* =============== SKILL ROUTES =============== */
router.get("/skills", getSkills);
router.post("/skills", createSkill);
router.put("/skills/:id", updateSkill);
router.delete("/skills/:id", deleteSkill);

/* =============== PROJECT ROUTES =============== */
router.get("/projects", getProjects);
router.post("/projects", createProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

/* =============== AUTH ROUTES =============== */
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", protect, logout);
router.get("/auth/me", protect, getMe);

module.exports = router;
