const fetch = require("node-fetch");
const express = require("express");
const axios = require("axios")
const app = express();

const axiosUserService = axios.create({
  baseURL:"http://users:5000"
});
const axiosArtistService = axios.create({
  baseURL:"http://artists:5000"
});

app.get("/", (req, res) => {
  res.json({ msg: "search" });
});

function searchValueInName(value, arr){
  try{
    let result = [];
    arr.forEach(element => {
        let name = element.name.toLowerCase(); 
        let isNameContaineValue = name.includes(value.toLowerCase());
        if(isNameContaineValue){
          result.push(element)
        }
    });
    return result;
  } catch(error){
      throw 'error: ' + error;
  }
 
}
/**
  Calling other services from a service is dangerous.
  If those services make their own calls there is a chance
  that you will get a circular call chain or that every request
  will take a lot of time.
 */
app.get("/api/v1/search", async (req, res) => {
  console.log("/api/v1/search")

  try{

    const userPromise    = await axiosUserService.get("/api/v1/users");
    const artistsPromise =  await axiosArtistService.get("/api/v1/artists");

    Promise.all([userPromise, artistsPromise]).then(function(response) {
      const users = response[0].data;
      const artists = response[1].data;
      let value = req.query.value;
      const artistsResult = searchValueInName(value, artists)
      const usersResult   = searchValueInName(value, users)
      const result = { artists: artistsResult, users: usersResult };
      res.json(result);
    });

  }catch(error) {
    console.log(error.stack);
    res.json({error: error});
  }
  

  
});

module.exports = app;
