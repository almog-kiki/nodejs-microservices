const express = require("express");
const Artists = require("./models/artist.model");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ msg: "artists" });
});

app.get("/api/v1/artists", async (req, res) => {
  const artists = await Artists.find({});
  res.json(artists);
});

app.post("/api/v1/artists/create", async (req, res) => {
  const artist = new Artists({ name: req.body.name });
  const savedArtist = await artist.save();
  res.json(savedArtist);
});

module.exports = app;
