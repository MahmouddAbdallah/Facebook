const express = require('express');
const { getPosts, createPost, updatePost, deletePost, getPost, updateLikePost } = require('../controller/postController');
const { getPostValidator } = require('../utils/validations/postValidator');
const upload = require('../middleware/upload');
const { protect } = require('../authToken');
const router = express.Router({ mergeParams: true });

router.route("/")
    .post(upload('photo'), protect, createPost)
    .get(protect, getPosts)

router.route("/:id")
    .get(getPostValidator, protect, getPost)
    .put(protect, updatePost)
    .delete(protect, deletePost)

router.patch("/like/:id", protect, updateLikePost)

module.exports = router