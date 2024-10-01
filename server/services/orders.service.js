// order.service.js
const dbConnection = require('../config/db.config'); // Make sure to import your database connection

const addOrder = async (orderInfo) => {
    const { customer_id, restaurant_id, total_price, orderDetails } = orderInfo;
    let response = {};

    try {
        // Insert into orders table
        const insertOrderQuery = `
            INSERT INTO orders (customer_id, restaurant_id, total_price) 
            VALUES ($1, $2, $3) RETURNING id`;
        
        const orderResult = await dbConnection.query(insertOrderQuery, [customer_id, restaurant_id, total_price]);
        console.log(orderResult)
        const orderId = orderResult.rows[0].id;

        // Insert into order_details table
        for (const detail of orderDetails) {
            const { pizza_id, topping_id, quantity } = detail;

            let insertOrderDetailQuery;
            let values;

            if (topping_id) {
                // If topping_id is provided, include it in the query
                insertOrderDetailQuery = `
                    INSERT INTO order_details (order_id, pizza_id, topping_id, quantity) 
                    VALUES ($1, $2, $3, $4)`;
                values = [orderId, pizza_id, topping_id, quantity];
            } else {
                // If topping_id is not provided, exclude it from the query
                insertOrderDetailQuery = `
                    INSERT INTO order_details (order_id, pizza_id, quantity) 
                    VALUES ($1, $2, $3)`;
                values = [orderId, pizza_id, quantity];
            }

            await dbConnection.query(insertOrderDetailQuery, values);
        }

        response.status = 200;
        response.message = "Order added successfully";
        response.orderId = orderId;
        return response;

    } catch (error) {
        console.error('Error adding order:', error);
        response.status = 500;
        response.message = 'Error adding order';
        return response;
    }
};


const getOrdersForSpecificUser = async (customerId) => {
    let response = {};
    try {
        const getOrdersQuery = `
            SELECT * FROM orders 
            WHERE customer_id = $1 AND deleted_at IS NULL`;
        
        const { rows } = await dbConnection.query(getOrdersQuery, [customerId]);
        
        response.status = 200;
        response.data = rows;
        return response;

    } catch (error) {
        console.error('Error fetching orders:', error);
        response.status = 500;
        response.message = 'Error fetching orders';
        return response;
    }
};



const getOrdersByRestaurant = async (restaurantId) => {
  try {
    const query = 'SELECT * FROM orders WHERE restaurant_id = $1';
    const result = await dbConnection.query(query, [restaurantId]);

    return result.rows;
  } catch (error) {
    throw new Error('Error fetching orders');
  }
};


const updateOrderStatus = async (orderId, status, restaurantId) => {
  try {
    // Check if the order belongs to the restaurant
    const checkQuery = 'SELECT * FROM orders WHERE id = $1 AND restaurant_id = $2';
    const checkResult = await dbConnection.query(checkQuery, [orderId, restaurantId]);

    if (checkResult.rows.length === 0) {
      // Return null if the order does not belong to this restaurant
      return null;
    }

    // Update the order status
    const updateQuery = 'UPDATE orders SET status = $1 WHERE id = $2';
    await dbConnection.query(updateQuery, [status, orderId]);

    return { success: true };
  } catch (error) {
    throw new Error('Error updating order');
  }
};



module.exports = { addOrder, getOrdersForSpecificUser ,getOrdersByRestaurant,updateOrderStatus};
