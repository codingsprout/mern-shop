const express = require('express');
const { addItemToCart } = require('../controller/cart');
const { requireLogin, middlewareForUsers } = require('../middleware/middleware');
const router = express.Router()

router.post('/user/cart/additem', requireLogin, middlewareForUsers, addItemToCart)

module.exports = router;