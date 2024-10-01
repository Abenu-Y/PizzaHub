const { errorHandler } = require('../services/error.service');
const roleService =require('../services/role.service');

const createRole = async(req,res,next) =>{
    try {
        const {name,permissions,restaurantId} = req.body;
        // console.log(name,permissions,restaurantId)
        if(!name || !permissions || !restaurantId){
            next(errorHandler(400,  'Missing required fields'));
        }

        // const { restaurantId }  = req.user
        // console.log("0",restaurantId)

        const response = await roleService.createRoleandGivePermission(name, permissions, restaurantId);
        if(response.status ===201){
            res.status(201).json(response);
        }

        if(response.status === 400){
            next(errorHandler(400, response.message));
        }
        
    } catch (error) {
         console.log("roeeee-1",error)
        next(error)
    }
    
}


module.exports = { createRole };