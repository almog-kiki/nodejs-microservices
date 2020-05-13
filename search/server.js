const app = require("./src/app");
const { DB_URI } = require("./src/config");
const mongoose = require("mongoose");

console.log(DB_URI)
mongoose.connect(DB_URI, { useNewUrlParser: true , useCreateIndex: true,useFindAndModify: false,useUnifiedTopology: true});
let db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let port = 5000;

app.listen(port, () => {
  console.log("search-service running on localhost:" + port);
  console.log("--------------------------");
});
