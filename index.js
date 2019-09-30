// implement your API here

const express = require("express");

const  dataModel = require("./data/db.js");

const server = express();

server.use(express.json());

///res/req functions go here!!!

const port = 8000;

server.listen(port, () => console.log("Server up!!!"));