// implement your API here

const express = require("express");

const  dataModel = require("./data/db.js");

const server = express();

server.use(express.json());

///res/req functions go here!!!

server.get("/", (req, res) => {
    res.send("Find your true North!!!");
});

server.get("/data", (req, res) => {
    dataModel.find()
        .then(data => {res.send(data)})
        .catch(err => {res.send(err)})
})



server.get("/data/:id", (req, res) => {
    const id = req.params.id;
    dataModel.findById(id)
        .then(data => {res.send(data)})
        .catch(err => {res.send(err)})
}) 

server.post("/data", (req, res) => {
    const addData = req.body;
    dataModel.insert(addData)
        .then(data => res.json(data))
        .catch(err => res.json(err))
    
})



const port = 8000;

server.listen(port, () => console.log("Server up!!!"));