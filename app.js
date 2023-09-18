const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("./models/User");
const Task = require("./models/Task");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

//MIDDLEWARE FOR SESSION MANAGEMENT
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

//INITIALIZE PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//PASSPORT LOCAL STRATEGY FOR AUTHENTICATION

//MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to db", error);
  });

//ROUTES
app.get("/", (req, res) => {
  res.send("Welcome");
});

//SERVER RUNNING
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
