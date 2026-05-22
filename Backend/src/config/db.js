/* =============== IMPORTS =============== */
const mongoose = require("mongoose");

/* =============== DATABASE CONNECTION =============== */
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database connected successfully.");
  } catch (error) {
    console.log("Database connection failed.");
    console.log(error.message);

    process.exit(1);
  }
}

/* =============== EXPORT DATABASE FUNCTION =============== */
module.exports = connectDB;
