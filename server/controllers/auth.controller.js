
const authService = require('../services/auth.service')
const { errorHandler } =  require('../services/error.service')
const bcrypt = require('bcrypt')

const userRegistration = async (req,res,next)=>{
    const userData = req.body;
    const { email , password , phoneNumber, location} = userData;

    if(!email || !password || !phoneNumber || !location){
        next(errorHandler(400,'All fields are required.'));
    }

    try{
        const user = await authService.checkIfUserExists(email);
        // console.log(user)

        if(user){
            next(errorHandler(400,'User already exists'));
        } else{
           
            const result = await authService.register(userData);
            // console.log(result)

            if(result.status === 201){
                res.status(201).json({message: 'User registered successfully.',status:201});
            } else{
                next(errorHandler(500,'Internal Server Error'))
            }
        }

    } catch(error){
        next(error)
    }
}


const login = async (req,res,next) =>{
    const { email , password } = req.body;
    if(!email || !password){
        next(errorHandler(400,'All fields are required.'))
    } 

    try {
        const response = await authService.login(req.body)
        // console.log("1",response)
        if(response.status === 200){
            res.status(200).json(response);
        } else{
            return next(errorHandler(400,'Invalid credentials'))
        }
    } catch (error) {
        next(error)
    }

}


const superAdminRegistration = async (req,res,next) =>{
    const adminData = req.body;
    const { adminName,restaurantName, email , password , phoneNumber, location} = adminData;

    if(!email || !password || !phoneNumber || !location || !adminName || !restaurantName){
       return next(errorHandler(400,'All fields are required.'));
    }

    try {
        const result = await authService.getUserByEmail(email);
        // console.log("result",result)

        if(result && result.length > 0 ){
            const [user] = result;
            let isMatch =   await bcrypt.compare(password,user.password);
            // console.log(isMatch)
            if(!isMatch){
                next(errorHandler(400,'use the same password'));
            }  

            const isTaken = await authService.isRestaurantNameTaken(restaurantName);

            if(isTaken){
               return  next(errorHandler(400,'Restaurant name is already taken'))
            }

            adminData.user_id = user.id;
            const response = await authService.makeUserSuperAdmin(adminData);
            if(response.status === 200){
                res.status(200).json({message: 'User made super admin successfully.'})
            } else{
                res.status(response.status).json(response)
            }

        } else{
            res.status(401).json({ message: "Before becoming an admin, please create an account to get started!" });
        }
        
    } catch (error) {
        console.log("e1",error)
        next(error)
    }
}

module.exports ={ userRegistration ,login, superAdminRegistration}