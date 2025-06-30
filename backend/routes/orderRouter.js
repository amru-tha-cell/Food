const express = require('express')
const {placeOrder,verifyOrder,updateStatus,userOrders,listOrders} = require('../controllers/orderController')
const authMiddleware = require('../middlewares/auth')
const orderRouter = express.Router()
orderRouter.post('/place',authMiddleware,placeOrder);
orderRouter.get('/userOrders',authMiddleware,userOrders);
orderRouter.post('/verify',verifyOrder)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateStatus)
module.exports = orderRouter