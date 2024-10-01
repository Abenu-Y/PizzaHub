
const menuService = require('../services/menu.service')

const addMenu = async (req, res, next) => {
    const pizzaInfo = req.body; 

    try {
        const response = await menuService.addMenu(pizzaInfo);

        if (response.status !== 201) {
            return next(errorHandler(400, 'Error adding pizza and toppings'));
        }

        return res.status(201).json(response); 
    } catch (error) {
        next(error);
    }
};



module.exports ={  addMenu }