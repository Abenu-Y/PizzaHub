const dbConnection = require('../config/db.config')

const fetchUserData = async() =>{

   try {
    const allusers = 'SELECT name,email, phone, deleted_at FROM users WHERE deleted_at IS NULL'
    const {rows}= await dbConnection.query(allusers)
    if(rows.length > 0){
        return {
            status:200,
            data:rows
        }
    } 

    return {
        status:400,
        data:"no user found"
    }

   } catch (error) {
    response.status = 500;
    response.message = 'Error fetching users.';
    return response;
   }
}

const checkIfRoleExists  = async(roleId) =>{
    try {
        const check_user = `SELECT * FROM roles WHERE id = $1`;
        const { rows }= await dbConnection.query(check_user, [roleId]);
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


const checkIfUserRoleExists = async(userID) =>{
    try {
        const check_user = `SELECT * FROM user_roles WHERE user_id = $1`;
        const { rows }= await dbConnection.query(check_user, [userID]);
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

const addUser = async(userData) =>{
    const {name, role, userId, restaurantId} = userData;
    console.log(userData)
     try {
        const updt_statement =` UPDATE users SET name = $1 WHERE id = $2`;
        const inst_statement_1 = `INSERT INTO user_roles(user_id, role_id, restaurant_id) VALUES($1,$2,$3)`;
        const inst_statement_2 = `INSERT INTO restaurant_admins(restaurant_id, user_id, role_id) VALUES($1,$2,$3)`;

        const res_1 = await dbConnection.query(updt_statement,[name,userId]);
        const res_2 = await dbConnection.query(inst_statement_1,[userId,role,restaurantId]);
        const res_3 = await dbConnection.query(inst_statement_2,[restaurantId,userId,role]);

        return {
            status:200,
            message:"role assigned successfully."
        }

     } catch (error) {
        throw new Error("Something went wrong");
     }
}


const dropUser = async(restaurantId,userID) =>{
    try {
        const drop_role = `UPDATE restaurant_admins  SET deleted_at = NOW()  WHERE restaurant_id = $1  AND user_id = $2`;
        const drop_role_from_user_roles = `UPDATE user_roles  SET deleted_at = NOW()  WHERE restaurant_id = $1  AND user_id = $2`;
        const response = await dbConnection.query(drop_role, [restaurantId,userID])
        const response1 = await dbConnection.query(drop_role_from_user_roles,[restaurantId,userID])
        console.log(response1)
    
        if(response.rowCount > 0 && response1.rowCount > 0){
           return {
              status:200,
              message:"user deleted successfully"
           }
          
        }
    
        return null; 
      } catch (error) {
        console.error('Error deleting user:', error);
        response.status = 500;
        response.message = 'Error deleting user.';
        return response;
      }
}



module.exports = { fetchUserData, addUser, dropUser ,checkIfUserRoleExists, checkIfRoleExists}