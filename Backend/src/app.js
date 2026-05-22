/* =============== IMPORTS =============== */
const express = require("express");
const cors = require("cors");

/* =============== APP CONFIGURATION =============== */
const app = express();

/* =============== MIDDLEWARES =============== */
app.use(cors());
app.use(express.json());

/* =============== TEST ROUTE =============== */
app.get("/", (req, res) => {
  res.send("SERVER IS RUNNING");
});

/* =============== EXPORT APP =============== */
module.exports = app;
