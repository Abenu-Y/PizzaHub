

const dbConnection = require('../config/db.config')

const addMenu = async (pizzaInfo) => {
    const { pizza, toppings } = pizzaInfo;

    const insertPizzaQuery = ` INSERT INTO pizzas (name, restaurant_id, base_price)  VALUES ($1, $2, $3)  RETURNING id`;
    
    const insertToppingQuery = ` INSERT INTO toppings (name, price)  VALUES ($1, $2) ON CONFLICT (name) DO NOTHING RETURNING id`;
    
    const insertPizzaToppingQuery = ` INSERT INTO pizza_toppings (pizza_id, topping_id) VALUES ($1, $2)`;

    let response = {};  
    try {
        // Insert the pizza and get its ID
        const pizzaResult = await dbConnection.query(insertPizzaQuery, [ pizza.name, pizza.restaurant_id,
            pizza.base_price
        ]);

        const pizzaId = pizzaResult.rows[0].id;

        // Insert toppings and link them to the pizza
        for (const topping of toppings) {
            // Check if topping already exists
            const toppingResult = await dbConnection.query(insertToppingQuery, [topping.name, topping.price]);

            const toppingId = toppingResult.rows[0]?.id;

            if (toppingId) {
                // Link topping to pizza
                await dbConnection.query(insertPizzaToppingQuery, [pizzaId,toppingId]);
            }
        }

        return {
            status: 201,
            message: "Pizza and toppings added successfully",
            pizzaId
        };
    } catch (error) {
        console.error('Error adding pizza and toppings:', error);
        response.status = 500;
        response.message = 'Error adding pizza and toppings';
        return response;
    }
};



module.exports ={ addMenu }



