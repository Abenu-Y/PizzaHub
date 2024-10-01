
const orderService = require('../services/orders.service')
const { errorHandler } = require('../services/error.service')

// order.controller.js
const addOrder = async (req, res, next) => {
    const orderInfo = req.body; // Assuming order details are sent in the request body

    try {
        const response = await orderService.addOrder(orderInfo);

        if (response.status !== 200) {
            return next(errorHandler(400, response.message));
        }

        return res.status(201).json(response); // Return a 201 Created status code
    } catch (error) {
        next(error);
    }
};

const getOrderHistoryForSpecificUser = async (req, res, next) => {
    const customerId = req.user.id; // Assuming the customer ID is stored in the JWT token

    try {
        const response = await orderService.getOrders(customerId);

        if (response.status !== 200) {
            return next(errorHandler(400, response.message));
        }

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};



// Get all orders for a specific restaurant
const getOrders = async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId[0].restaurant_id; // Extract restaurant ID from the authenticated user
    console.log(restaurantId,"uu")
    const orders = await orderService.getOrdersByRestaurant(restaurantId);
    console.log(orders)

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Update the status of an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params; // Order ID from URL
    const { status } = req.body; // New status from request body
    const restaurantId = req.user.restaurantId[0].restaurant_id; // Extract restaurant ID from the authenticated user

    const updatedOrder = await orderService.updateOrderStatus(id, status, restaurantId);

    if (!updatedOrder) {
      return res.status(403).json({ error: 'Unauthorized to update this order' });
    }

    return res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ error: 'Failed to update order' });
  }
};









module.exports ={ getOrders, updateOrder ,getOrderHistoryForSpecificUser, addOrder }