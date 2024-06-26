const express = require("express");
const router = express.Router()
const CartItemController = require('../controller/CartItemController');
const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create/:id', CartItemController.createCartItem)
router.get('/order/:id', CartItemController.getDetailsCartItem)
router.put('/update/:id', CartItemController.updateCartItem)

module.exports = router