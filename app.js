const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL, () => {
  console.log(`Connected to MongoDB`);
});
