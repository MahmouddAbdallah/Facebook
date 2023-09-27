const express = require('express');
const { protect } = require('../authToken');
const { getUsers, updateUser, getUser, deleteUser } = require('../controller/userController');
const { getUserValidator, updateUserValidator } = require('../utils/validations/userValidator');
const postRouter = require('./postRouter');
const upload = require('../middleware/upload');
const router = express.Router();
router.use("/:userId/post", postRouter)

router.route("/")
    .get(protect, getUsers)
router.route("/:id")
    .get(getUserValidator, protect, getUser)
    .put(upload("picture"), updateUserValidator, protect, updateUser)
    .delete(deleteUser)



module.exports = router