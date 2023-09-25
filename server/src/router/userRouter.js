const express = require('express');
const { authToken } = require('../authToken');
const { getUsers, updateUser, getUser, deleteUser } = require('../controller/userController');
const { getUserValidator, updateUserValidator } = require('../utils/validations/userValidator');
const postRouter = require('./postRouter');
const upload = require('../middleware/upload');
const router = express.Router();
router.use("/:userId/post", postRouter)

router.route("/")
    .get(getUsers)
router.route("/:id")
    .get(getUserValidator, getUser)
    .put(upload("picture"), updateUserValidator, updateUser)
    .delete(deleteUser)



module.exports = router