

const dbConnection = require('../config/db.config')

const checkDuplicatePizzaName =async(pizzaName) =>{

    const query = `SELECT * FROM pizzas WHERE name = $1`

    try {
        const response = await dbConnection.query(query,[pizzaName])
        if(response.rows.length > 0){
            return true
        } else{
            return false
        }
        
    } catch (error) {
        return {
            status: false,
            message: 'Error checking duplicate pizza name',
            error: error
        
        }
    }
}

const addMenu = async (pizzaInfo) => {
    const { pizza, toppings } = pizzaInfo;

    const insertPizzaQuery = ` INSERT INTO pizzas (name, restaurant_id, base_price)  VALUES ($1, $2, $3)  RETURNING id`;
    
    const insertToppingQuery = ` INSERT INTO toppings (name, price)  VALUES ($1, $2) RETURNING id`;
    
    const insertPizzaToppingQuery = ` INSERT INTO pizza_toppings (pizza_id, topping_id) VALUES ($1, $2)`;

    let response = {};  
    try {
        // Insert the pizza and get its ID
        const check = await checkDuplicatePizzaName(pizza.name)
        if(check){
            return {
                status: 400,
                message: 'Pizza name already exists',
            }
        }
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

const getMenu = async() =>{

    const fetchMenuQuery = `SELECT 
                                p.id AS pizza_id,
                                p.name AS pizza_name,
                                p.base_price AS pizza_base_price,
                                r.id AS restaurant_id,
                                r.name AS restaurant_name,
                                JSON_AGG(
                                    JSON_BUILD_OBJECT(
                                        'name', t.name,
                                        'price', t.price
                                    )
                                ) AS toppings
                            FROM 
                                pizzas p
                            JOIN 
                                restaurants r ON p.restaurant_id = r.id
                            LEFT JOIN 
                                pizza_toppings pt ON p.id = pt.pizza_id
                            LEFT JOIN 
                                toppings t ON pt.topping_id = t.id
                            WHERE 
                                p.deleted_at IS NULL
                                AND r.deleted_at IS NULL
                                AND t.deleted_at IS NULL
                                AND t.name IS NOT NULL
                            GROUP BY 
                                p.id, p.name, p.base_price, r.name, r.id
                            ORDER BY 
                                p.name, r.name`

                       try {

                        const response = await dbConnection.query(fetchMenuQuery)

                        if(response.rows.length > 0){
                            return {
                                status:200,
                                message:"All menu",
                                data:response.rows
                            }
                        } else{
                            return{
                                status:400,
                                message:"NO MENU FOUND!"
                            }
                        }
                        
                       } catch (error) {
                            console.error('Error getting pizza and toppings:', error);
                            response.status = 500;
                            response.message = 'Error getting pizza and toppings';
                            return response;
                       }         

}



const getSinglePizza = async(pizzaId)=>{
    const query = `
  SELECT 
      p.id AS pizza_id,
      p.name AS pizza_name,
      p.base_price AS pizza_base_price,
      r.name AS restaurant_name,
      r.id AS restaurant_id,
      t.id AS topping_id,
      JSON_AGG(
          JSON_BUILD_OBJECT(
              'name', t.name,
              'price', t.price
          )
      ) AS toppings
  FROM 
      pizzas p
  JOIN 
      restaurants r ON p.restaurant_id = r.id
  LEFT JOIN 
      pizza_toppings pt ON p.id = pt.pizza_id
  LEFT JOIN 
      toppings t ON pt.topping_id = t.id
  WHERE 
      p.deleted_at IS NULL
      AND r.deleted_at IS NULL
      AND p.id = $1  
  GROUP BY 
      p.id, p.name, p.base_price, r.name,r.id,t.id
`;

try {

    const response = await dbConnection.query(query,[pizzaId])

    if(response.rows.length > 0){
        return {
            status:200,
            message:"single menu",
            data:response.rows
        }
    } else{
        return{
            status:400,
            message:"NO MENU FOUND!"
        }
    }
    
   } catch (error) {
        console.error('Error getting pizza and toppings:', error);
        response.status = 500;
        response.message = 'Error getting pizza and toppings';
        return response;
   }         


}

module.exports ={ addMenu ,getMenu,getSinglePizza }



