/* =============== IMPORTS =============== */
const dotenv = require("dotenv");
const app = require("./app");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

/* =============== DOTENV CONFIGURATION =============== */
dotenv.config();

/* =============== PORT CONFIGURATION =============== */
const PORT = 5000;
const HOST = "127.0.0.1";

/* =============== START SERVER =============== */
connectDB().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
  });
});
