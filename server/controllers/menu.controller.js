
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


const getMenu = async(req,res,next) =>{
   try {
    const response = await menuService.getMenu();
    if(response.status === 200){
        return res.status(200).json(response);
    }

    return res.status(response.status).json(response)
    
   } catch (error) {
     next(error)
   }
}

const getSinglePizza = async(req,res, next)=>{
    const {id} = req.params
    try {
        const response = await menuService.getSinglePizza(id);
        if(response.status === 200){
            return res.status(200).json(response);
        }
    
        return res.status(response.status).json(response)
        
       } catch (error) {
         next(error)
       }
    }

module.exports={addMenu ,getMenu, getSinglePizza }