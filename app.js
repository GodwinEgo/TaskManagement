const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

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

//SERVER RUNNING
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
