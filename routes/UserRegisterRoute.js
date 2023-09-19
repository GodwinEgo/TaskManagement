const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterRoute = async (req, res) => {
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
};
module.exports = RegisterRoute;
