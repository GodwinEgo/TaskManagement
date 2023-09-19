const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");

const User = require("./models/User");
const Task = require("./models/Task");

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

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

//REGISTER ROUTE
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    //check if username exits in th database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username Already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    user.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log("Error creating user: ", error);
    res.status(201).json({ error: "Failed to register user" });
  }
});
//LOGIN ROUTE
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }
  } catch (error) {}
});

//SERVER RUNNING
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
