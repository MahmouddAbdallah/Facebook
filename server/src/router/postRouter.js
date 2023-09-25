const express = require('express');
const { getPosts, createPost, updatePost, deletePost, getPost, updateLikePost } = require('../controller/postController');
const { getPostValidator } = require('../utils/validations/postValidator');
const upload = require('../middleware/upload');
const { authToken } = require('../authToken');
const router = express.Router({ mergeParams: true });

router.route("/")
    .post(upload('photo'), createPost)
    .get(getPosts)

router.route("/:id")
    .get(getPostValidator, getPost)
    .put(updatePost)
    .delete(deletePost)

router.patch("/like/:id", updateLikePost)

module.exports = router