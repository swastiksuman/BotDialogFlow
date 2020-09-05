const express = require("express");
const app = express(); // create express app
const interact = require('./index');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
require('dotenv').config();
 
app.get("/", (req, res) => {
  res.send("This is from express.js");
});

app.post("/interact", (req, res) => {
  console.log("+++POST+++")
  res.send(interact.runSample());
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});