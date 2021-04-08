// implement your posts router here
const Posts = require("./posts-model");
const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    const newPost = req.body;
    if (!newPost.title || !newPost.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post",
        });
    } else {
        Posts.insert(newPost)
            .then(posts => {
                res.status(201).json(posts);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: "There was an error while saving the post to the database",
                });
            });
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedPost = req.body;
    if (!updatedPost.title || !updatedPost.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Posts.update(id, updatedPost)
            .then(post => {
                if (!post) {
                    res.status(404).json({
                        message: "The post with the specified ID does not exist",
                    });
                } else {
                    res.status(200).json(post);
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: "The post information could not be modified",
                });
            });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Posts.remove(id)
        .then(posts => {
            if (!posts) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist",
                });
            } else {
                res.status(200).json(posts);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "The post could not be removed",
            });
        });
});

router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    Posts.findPostComments(id)
        .then(comments => {
            if (!comments) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist",
                });
            } else {
                res.status(200).json(comments);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "The comments information could not be retrieved"
            });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    Posts.findById(id)
        .then(post => {
            if (!post) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist",
                });
            } else {
                res.status(200).json(post);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "The posts information could not be retrieved",
            });
        });
});

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "The posts information could not be retrieved",
            });
        });
});

module.exports = router