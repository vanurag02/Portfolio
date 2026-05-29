/* =============== IMPORTS =============== */
const express = require("express");
const cors = require("cors");
const routes = require("./routes/route");

/* =============== APP CONFIGURATION =============== */
const app = express();

/* =============== MIDDLEWARES =============== */
app.use(cors());
app.use(express.json());

/* =============== TEST ROUTE =============== */
app.get("/", (req, res) => {
  res.send("SERVER IS RUNNING");
});

app.use("/api", routes);

/* =============== EXPORT APP =============== */
module.exports = app;
