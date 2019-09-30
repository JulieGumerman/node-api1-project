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
        .catch(err => {res.status(500).send({error: "The hobbits are at a party and cannot be retrieved."})})
})



server.get("/data/:id", (req, res) => {
    const id = req.params.id;
    const addData = req.body;
    if ( addData.id ) {
        dataModel.findById(id)
            .then(data => {res.send(data)})
            .catch(err => {res.status(500).send(`{error: "The hobbit's info could not be retrieved"}`)})
    } else {
        res.status(404).send({error: "The specified hobbit does not exist."});
    }
    // dataModel.findById(id)
    //     .then(data => {res.send(data)})
    //     .catch(err => {res.status(500).send(`{error: "The hobbit's info could not be retrieved"}`)})
}) 

server.post("/data", (req, res) => {
    const addData = req.body;
    
    if (!addData.name || !addData.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the hobbit."})}
    else {
        dataModel.insert(addData)
        .then(data => {
            if (!addData.name || !addData.bio) {
                res.status(400).json({errorMessage: "Please provide name and bio for the hobbit."})
            } else (res.status(201).json(data))
            })
        .catch(err => res.status(500).json({error: "There was an error while saving the hobbit to the database."}))
    }
    
})


server.put("/data/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (changes.id) {
        dataModel.update(id, changes)
        .then(hobbit => {
            res.status(200).json(hobbit);
            console.log(hobbit);
        })
        .catch(err => res.status(500).json({error: "Hobbit information could not be modified"}));
    } else (
        res.status(404).json({error: "Hobbit does not exist."})
    )
    // dataModel.update(id, changes)
    //     .then(hobbit => {
    //         res.status(200).json(hobbit);
    //         console.log(hobbit);
    //     })
    //     .catch(err => res.status(500).json({error: "Hobbit information could not be modified"}));

})



server.delete("/data/:id", (req, res) => {
    const id = req.params.id;
    dataModel.remove(id)
        .then(hobbit => {res.json(hobbit)})
        .catch(err => {res.status(500).json({message: "The hobbit could not be removed"})})
})

const port = 8000;

server.listen(port, () => console.log("Server up!!!"));