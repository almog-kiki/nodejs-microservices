const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Artist", ArtistSchema);
