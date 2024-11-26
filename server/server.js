const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { db } = require("./firebase.js");

const server = express();
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`server started on port ${PORT}`));

server.use(express.static("build"));
server.use(bodyParser.json());

server.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./build/index.html"), (error) => {
        if (error) {
            res.status(500).send(error);
        }
    });
});