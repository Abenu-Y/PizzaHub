const express = require('express')
const authenticateJWT = require('../middlewares/authenticate')
const router = express.Router()
const orderController = require('../controllers/orders.controller')
const authorize = require('../middlewares/authorize')


router.get('/get-order', authenticateJWT,orderController.getOrderHistoryForSpecificUser)
router.put('/status/:id', authenticateJWT, authorize('update','order'),orderController.updateOrder)
router.get('/get-all-orders', authenticateJWT,authorize('read','orders'), orderController.getOrders)
router.post('/add',authenticateJWT, orderController.addOrder )

module.exports = router
//read
//update
//order-history for customer
//create-order for customer
//fetch /get pizzas