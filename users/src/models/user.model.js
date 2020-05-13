const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
