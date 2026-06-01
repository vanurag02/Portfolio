/* =============== IMPORTS =============== */
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/route");

/* =============== APP CONFIGURATION =============== */
const app = express();

/* =============== MIDDLEWARES =============== */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

/* =============== TEST ROUTE =============== */
app.get("/", (req, res) => {
  res.send("SERVER IS RUNNING");
});

app.use("/api", routes);

/* =============== EXPORT APP =============== */
module.exports = app;
