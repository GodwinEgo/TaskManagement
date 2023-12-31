const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const AuthenticatedUser = require("./middleware/Auth");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/TaskRoute");

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

//AUTH
app.use("/auth", authRoutes);

app.use("/api", taskRoutes);
//PROTECTED ROUTE
app.get("/protected", AuthenticatedUser, (req, res) => {
  res.status(201).json({ message: "Hey! You've accessed a protected route" });
});

//SERVER RUNNING
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
