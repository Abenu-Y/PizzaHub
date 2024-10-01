
const userService = require('../services/users.service')

const fethUserData = async(req,res,next) =>{

    try {
        const response = await userService.fetchUserData();
        if(response.status === 200){
             res.status(200).json(response)
        }
    } catch (error) {
        next(error)
    }

}


module.exports = { fethUserData };