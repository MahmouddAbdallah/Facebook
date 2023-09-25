const express = require('express');
const { register, login } = require('../controller/authController');
const { registerValdator, loginValdator } = require('../utils/validations/authValidators');

const router = express.Router();

router.post("/register", registerValdator, register)
router.post("/login", loginValdator, login)


module.exports = router