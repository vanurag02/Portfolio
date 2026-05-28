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
} = require("../controllers/controller");

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

module.exports = router;
