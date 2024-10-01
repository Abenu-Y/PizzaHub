const dbConnection = require('../config/db.config')

const fetchUserData = async() =>{
   let response = {}
   try {
    const allusers = 'SELECT name,email, phone, deleted_at FROM users'
    const {rows}= await dbConnection.query(allusers)
    if(rows.length > 0){
        return {
            status:200,
            data:rows
        }
    } 

    return response

   } catch (error) {
    response.status = 500;
    response.message = 'Error fetching users.';
    return response;
   }
}



module.exports = { fetchUserData }