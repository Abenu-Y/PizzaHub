
const userService = require('../services/users.service')
const { errorHandler } = require('../services/error.service');
const { getUserByEmail, register } = require('../services/auth.service');

const fethUserData = async(req,res,next) =>{

    try {
        const response = await userService.fetchUserData();
        if(response.status === 200){
             res.status(200).json(response)
        }
        return response;
    } catch (error) {
        next(error)
    }

}

const addUser = async (req, res, next) => {
    const { email, name, phoneNumber, location, role, password } = req.body;

    // Check if all required fields are provided
    if (![email, name, password, location, role, phoneNumber].every(Boolean)) {
        return next(errorHandler(400, 'All fields are required.'));
    }

    const restaurantId = req.user.restaurantId[0].restaurant_id;
    const data = { name, role, restaurantId };

    try {
        let existingUser = await getUserByEmail(email);
    
        // If user does not exist, register them
        if (!existingUser || existingUser.length === 0) {
            const registerResponse = await register(req.body);
    
            if (registerResponse.status !== 201) {
                return next(errorHandler(500, 'Error during registration.'));
            }
    
            // Retrieve newly registered user's details
            existingUser = await getUserByEmail(email);
    
            if (!existingUser || existingUser.length === 0) {
                return next(errorHandler(500, 'Failed to retrieve newly registered user.'));
            }
        }
    
        // Get userId after successful registration or fetch
        const userId = existingUser[0]?.id;
    
        // Check if userId is valid
        if (!userId) {
            return next(errorHandler(500, 'User ID is undefined.'));
        }
    
        // Prepare data for role assignment
        const data = { name, role, restaurantId: req.user.restaurantId[0].restaurant_id, userId };

        //check if the role exists in the role list
        const roleIfexists = await userService.checkIfRoleExists(role)

        if(!roleIfexists){
            return next(errorHandler(400, 'This role doesnot exist.'));
        }
    
        // Check if the user already has a role within the organization
        const roleExists = await userService.checkIfUserRoleExists(userId);
    
        if (roleExists) {
            return next(errorHandler(400, 'User cannot be assigned multiple roles in the same organization.'));
        }
    
        // Assign new role to user
        const addUserResponse = await userService.addUser(data);
    
        if (addUserResponse.status === 200) {
            return res.status(200).json({ message: 'User registered and role assigned successfully.' });
        }
    
        return next(errorHandler(500, 'Error assigning user role.'));
    
    } catch (error) {
        return next(error);
    }
    
};



const dropUser = async(req,res, next) =>{
    try {

        const { userId ,restaurantId} = req.body;
        const response = await userService.dropUser(restaurantId,userId);

        if(response?.status !== 200){
              return next(errorHandler(400,'This user doesnot exist.'))
        }


        return res.status(200).json(response)
        
    } catch (error) {
        next(error)
    }
}


module.exports = { fethUserData , addUser , dropUser};