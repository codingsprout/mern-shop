const express = require('express');
const { register, login} = require('../controller/auth');
const { isRequestValidated, validateRegisterRequest, validateLoginRequest } = require('../validators/auth');
const router = express.Router();

router.post('/login', validateLoginRequest, isRequestValidated, login)

router.post('/register', validateRegisterRequest, isRequestValidated, register)

module.exports = router;