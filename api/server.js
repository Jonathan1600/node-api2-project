// implement your server here
// require your posts router and connect it here

const express = require("express");
const postsRouter = require("./posts/posts-router");
const server = express();
const cors = require("cors")

server.use(cors())
server.use(express.json());
server.use("/api/posts", postsRouter);

server.use("*", (req, res) => {
    res.status(404).json({
        message: "Wrong url, please try again with a different one."
    })
});

module.exports = server;