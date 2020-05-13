const fetch = require("node-fetch");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "search" });
});

let URL = "http://localhost"


function searchValueInName(value, arr){
  let result = [];
  arr.forEach(element => {
      let name = element.name.toLowerCase(); 
      let isNameContaineValue = name.includes(value.toLowerCase());
      if(isNameContaineValue){
        result.push(element)
      }
  });
  return result;
}
/**
  Calling other services from a service is dangerous.
  If those services make their own calls there is a chance
  that you will get a circular call chain or that every request
  will take a lot of time.
 */
app.get("/api/v1/search", async (req, res) => {
  console.log("/api/v1/search")

  const artistsPromise = fetch(URL + "/api/v1/artists");
  const userPromise    = fetch(URL + "/api/v1/users");
  const promises = [artistsPromise, userPromise];
  const [artistResponse, userResponse] = await Promise.all(promises);
  const artistJson = await artistResponse.json();
  const userJson = await userResponse.json();
  let value = req.query.value;
  
  const artistsResult =  searchValueInName(value, artistJson)
  const usersResult = searchValueInName(value, userJson)

  const result = { artists: artistsResult, users: usersResult };
  res.json(result);

  
});

module.exports = app;
