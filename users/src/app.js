const express = require("express");
const User = require("./models/user.model");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ msg: "users" });
});

app.get("/api/v1/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

app.post("/api/v1/users/create", async (req, res) => {
  const user = new User({ name: req.body.name, age: req.body.age });
  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = app;
