'use strict'
const Post = require("../model/Post");
const User = require("../model/User");
const ApiFeatures = require("../utils/Api");
const { deleteOne } = require("./factory");

exports.createPost = async (req, res) => {
    try {
        const { ...body } = req.body
        body.photo = req.file.filename
        const doc = await Post.create(body)
        const data = await doc.populate({ path: "user", select: "first_name last_name picture _id" })
        res.status(200).json({ data: doc })
    } catch (error) {
        res.status(400).json({ errors: error })
    }
}

exports.getPosts = async (req, res) => {
    try {
        const { userId } = req.params || ""
        const api = new ApiFeatures(Post, req)
            .filters(userId)
            .sort()
            .search()
            .fields()
            .populate("user", " first_name last_name picture _id")
            .populate("like.user", " first_name last_name picture _id")
        const doc = await api.Model
        res.status(200).json({ data: doc })
    } catch (error) {
        res.status(400).json({ errors: error.message })
    }
}
exports.getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await Post.findById(id)
            .populate({ path: "user", select: "first_name last_name picture" })
        if (!doc) {
            return res.status(400).json({ errors: "this document is not fond" })
        }
        res.status(200).json({ data: doc })
    } catch (error) {
        res.status(400).json({ errors: error })
    }
}

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { ...body } = req.body
        const doc = await Post.findByIdAndUpdate(id, body, { new: true })
        res.status(200).json({ data: doc })
    } catch (error) {
        res.status(400).json({ errors: error })
    }
}
exports.deletePost = deleteOne(Post)

exports.updateLikePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id)

        let listLikes = post.like;
        let like;

        const user = listLikes.filter((item) => {
            const newLikes = item?.user?.toString()
            return newLikes != userId
        })

        const isLike = listLikes?.toString()
        if (isLike.includes(userId)) {
            like = { like: user };
        } else {
            like = { $push: { like: [{ user: userId }] } };
        }
        const postlike = await Post.findByIdAndUpdate(id, like, { new: true })
        res.status(200).json(postlike.like)
    } catch (error) {
        res.status(400).json(error.message)
    }
} 