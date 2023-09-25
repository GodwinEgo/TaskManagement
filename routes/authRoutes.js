const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const { route } = require("./TaskRoute");

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    //check if username exits in th database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username Already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log("Error creating user: ", error);
    res.status(201).json({ error: "Failed to register user" });
  }
});

router.post("/login", async (req, res) => {
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
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    return res.status(201).json({ message: "Login Successful!!", token });
  } catch (error) {
    res.status(400).json({ error: "Login Failed" });
    console.log(`error logging in: ${error}`);
  }
});

module.exports = router;
