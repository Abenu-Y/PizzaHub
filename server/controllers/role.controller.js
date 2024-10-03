const { errorHandler } = require('../services/error.service');
const roleService =require('../services/role.service');

const createRole = async(req,res,next) =>{
    try {
        const {name,permissions,restaurantId} = req.body;
        console.log("gagagbtatas",name,permissions,restaurantId)
        if(!name || !permissions || !restaurantId){
            next(errorHandler(400,  'Missing required fields'));
        }

        // const { restaurantId }  = req.user
        // console.log("0",restaurantId)

        const response = await roleService.createRoleandGivePermission(name, permissions, restaurantId);
        console.log("s",response)
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

const getRoles  = async(req,res,next) =>{
    const restaurantId = req.user.restaurantId[0].restaurant_id;
    try {
         const response = await roleService.getRoles(restaurantId)
         if(response.status !== 200){
            return next(errorHandler(400,'rror fetching role and inserting permissions'))
         }

         return res.status(200).json(response);

    } catch (error) {
        next(error)
    }

}


const dropRoles = async(req,res,next) =>{
    try {

        const { roleId ,restaurantId } = req.body;
        const response = await roleService.dropRoles(restaurantId,roleId);
        console.log(response)

        if(response?.status !== 200){
              return next(errorHandler(400,'This roles doesnot exist.'))
        }


        return res.status(200).json(response)
        
    } catch (error) {
        next(error)
    }
}


module.exports = { createRole , getRoles  , dropRoles};