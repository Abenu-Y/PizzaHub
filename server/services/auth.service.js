
const dbConnection = require('../config/db.config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { getUserInfo } = require('./role.service');


const checkIfUserExists = async (email) =>{
    try {
        const check_user = `SELECT * FROM users WHERE email = $1`;
        const { rows }= await dbConnection.query(check_user, [email]);
        // console.log("rows",rows)

        if(rows.length > 0){
            return true;
        } else{
            return false;
        }

    } catch (error) {
        throw new Error("Something went wrong");
    }
}


const getUserByEmail = async(email) =>{
    try {
        const check_user = `SELECT * FROM users WHERE email = $1`;
        const { rows } = await dbConnection.query(check_user, [email]);
        // console.log("this",rows)
        if(rows.length > 0 ){
            return rows;
        } else{
            return {};
        }

    } catch(error){
        throw new Error("Something went wrong");
    }
}

const getRestaurantByName = async(name) =>{
    try {
        const check_restaurant = `SELECT * FROM restaurants WHERE name = $1`;
        const { rows } = await dbConnection.query(check_restaurant, [name]);
        // console.log("this",rows)
        if(rows.length > 0 ){
            return rows;
        } else{
            return {};
        }

    } catch(error){
        throw new Error("Something went wrong");
    }
}


const isRestaurantNameTaken = async(restaurant_name) =>{

    const istaken =`SELECT * FROM restaurants WHERE name = $1`;
    try {
        const { rows } = await dbConnection.query(istaken, [restaurant_name]);
        // console.log("istaken: ",rows)

        if(rows.length > 0){
            return true
        } else{
            return false
        }
        
    } catch (error) {
        throw new Error("Something went wrong");
    }

}


const register =async(userData) =>{
    const { email , password , phoneNumber, location} = userData;
    let response ={};
    if(!email || !password || !phoneNumber || !location){
        return response;
    }

    try {

        const userRegistrationSql = `INSERT INTO users (email,password,location, phone) VALUES($1,$2,$3,$4)`;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await dbConnection.query(userRegistrationSql,[email,hashedPassword,location,phoneNumber]);
        // console.log(result)

        if(result.rowCount > 0 ){
            response.status = 201;
            response.message = 'User registered Successfully';
            return response;
        }
        return response;
        
    } catch (error) {
        throw errorHandler(500, 'Something went wrong during registration');
    }

}


const login = async(loginData) =>{
    const { email, password } = loginData;
    let response = {};
    // console.log(req.body)

    try {
        const result = await checkIfUserExists(email);
        // console.log(result,email)
        if(result){
            const [user]= await getUserByEmail(email);
            const res = await getUserInfo(user.id);

            // console.log("first",user.password)
            // console.log(user)

            let isMatch =   await bcrypt.compare(password,user.password)

            if(isMatch){
                console.log(res)
                const token = jwt.sign({ id: user.id, restaurantId: res }, process.env.JWT_SECRET, {
                    expiresIn: '1h', 
                  });
                response.x_access_token = token;
                response.status = 200;
                response.message ='user successfully logged in.'
                return response;
            } 

            return response;
           
        }else{
            return response;
        }
    } catch (error) {
        throw new Error("Something went wrong");
    }
}


const makeUserSuperAdmin = async(adminData) =>{
    const { adminName,restaurantName, email , phoneNumber, location,user_id} = adminData;
    let response={};
    // console.log(user_id)
    const update_statement = `UPDATE users SET name = $1 WHERE email = $2`;
    const insert_statement = `INSERT INTO restaurants (name,address,phone) VALUES ($1,$2,$3)`;
    // const insert_superadmin_role =`INSERT INTO roles (name,description,restaurant_id) VALUES($1,$2,$3)`;
    const insert_USER_role =`INSERT INTO user_roles (user_id,role_id,restaurant_id) VALUES($1, $2, $3)`;
    const inset_ADMIN = `INSERT INTO restaurant_admins(restaurant_id , user_id , role_id) VALUES($1,$2,$3)`;
    

    try {
        const result_1 = await dbConnection.query(update_statement,[adminName,email])
        const result_2 = await dbConnection.query(insert_statement,[restaurantName,location,phoneNumber])
        const [restaurant] =await getRestaurantByName(restaurantName);
        // console.log(restaurant)
        const result_4 = await dbConnection.query(insert_USER_role,[user_id,1, restaurant.id]);
        const result_5 = await dbConnection.query(inset_ADMIN,[restaurant.id,user_id,1]);
        
        response.status = 200;
        response.message = 'Admin successfully created.';
        return response;
         
    } catch (error) {
        console.error('Error creating admin or restaurant:', error.message);

        response.status = 500;
        response.message = 'Failed to create admin and restaurant. Please try again later.';
        return response;
    }

}



module.exports = { checkIfUserExists ,register,login ,getUserByEmail ,makeUserSuperAdmin,isRestaurantNameTaken,getRestaurantByName}