

const dbConnection = require('../config/db.config');

const getUserInfo =  async(userId)=>{
   try {
    const info = `SELECT * FROM user_roles WHERE user_id = $1 `;
     const {rows} = await dbConnection.query(info, [userId]);
    //  console.log("roessss", rows)
     return rows;
   } catch (error) {
     throw new Error("Something went wrong");
   }
}


const getRoleId = async(roleName) =>{
    const query = 'SELECT id FROM roles WHERE name = $1';
    const result = await dbConnection.query(query, [roleName]);
    // console.log("re",result)
    // If role is found, return the role_id
    if (result.rows.length > 0) {
        return result.rows[0].id; 
    }

    
    // If role is not found, insert it
    const insertQuery = 'INSERT INTO roles (name) VALUES ($1) RETURNING id';
    const insertResult = await dbConnection.query(insertQuery, [roleName]);
    
    return insertResult.rows[0].id; 
}


const checkPermissionExists = async (roleId, resource, action, restaurantId) => {
    const checkQuery = `
      SELECT * FROM role_permissions
      WHERE role_id = $1 AND resource = $2 AND action = $3 AND restaurant_id = $4
    `;
  
    try {
      const checkResult = await dbConnection.query(checkQuery, [roleId, resource, action, restaurantId]);
      
      if (checkResult.rows.length > 0) {
        console.log(`Permission for role: ${roleId}, resource: ${resource}, action: ${action} already exists.`);
        return true;  
      }
      
      return false;  
    } catch (error) {
      console.error('Error checking permission existence:', error);
      throw new Error('Database error during permission check.');
    }
  };
  

const createRoleandGivePermission = async (roleName, permissions, restaurantId) => {
    // console.log(roleName, permissions, restaurantId);
    let response = {};

    if (permissions.length === 0) {
        response.status = 400;
        response.message = 'No permissions provided for insertion.';
        return response;
    }

    try {
        const roleId = await getRoleId(roleName);

        for (const permission of permissions) {
            const permissionExists = await checkPermissionExists(roleId, permission.resource, permission.action, restaurantId);
      
            if (permissionExists) {
              response.status = 400;
              response.message = `Permission for role with resource: ${permission.resource}, action: ${permission.action}, and restaurant ID: ${restaurantId} already exists.`;
              return response;  // Stop if permission exists
            }
            
            const insertQuery = `INSERT INTO role_permissions (role_id, resource, action, restaurant_id) VALUES ($1, $2, $3, $4)`;

            await dbConnection.query(insertQuery, [roleId, permission.resource, permission.action, restaurantId]);
            
        }

        response.status = 201;
        response.message = 'Role created and permissions inserted successfully.';
        return response;

    } catch (error) {
        console.error('Error inserting role and permissions:', error);
        response.status = 500;
        response.message = 'Error creating role and inserting permissions.';
        return response;
    }
};


const getRoles = async(restaurantId) =>{
  let response ={};
  try {

    const getRolesResponse = `SELECT 
                                  roles.name,                      
                                  roles.created_at,                
                                  roles.id AS role_id,             
                                  COALESCE(JSON_AGG(              
                                      JSON_BUILD_OBJECT(          
                                          'resource', role_permissions.resource,
                                          'action', role_permissions.action
                                      )
                                  ) FILTER (WHERE role_permissions.resource IS NOT NULL), '[]') AS role  
                              FROM 
                                  roles
                              JOIN 
                                  role_permissions 
                              ON 
                                  roles.id = role_permissions.role_id  
                              WHERE     
                                  role_permissions.restaurant_id = $1     
                              GROUP BY 
                                  roles.name, roles.created_at, roles.id, roles.deleted_at  
                              ORDER BY 
                                  roles.created_at                   
                            `       

    const {rows} =  await dbConnection.query(getRolesResponse,[restaurantId])
    console.log(rows)
    if(rows.length > 0){
      response.status = 200;
      response.data = rows;
      return response;
    }

    return null;
    
  } catch (error) {
    console.error('Error fetching role and permissions:', error);
    response.status = 500;
    response.message = 'Error fetching role and  permissions.';
    return response;
  }
}


const dropRoles = async(restaurantId,roleID) =>{
  try {
    const drop_role = `UPDATE restaurant_admins  SET deleted_at = NOW()  WHERE restaurant_id = $1  AND role_id = $2`;
    const drop_role_from_user_roles = `UPDATE user_roles  SET deleted_at = NOW()  WHERE restaurant_id = $1  AND role_id = $2`;
    const response = await dbConnection.query(drop_role, [restaurantId,roleID])
    const response1 = await dbConnection.query(drop_role_from_user_roles,[restaurantId,roleID])
    console.log(response1)

    if(response.rowCount > 0 && response1.rowCount > 0){
       return {
          status:200,
          message:"roles deleted successfully"
       }
      
    }

    return null; 
  } catch (error) {
    console.error('Error deleting role:', error);
    response.status = 500;
    response.message = 'Error deleting role.';
    return response;
  }
}

module.exports ={ getUserInfo, getRoleId ,createRoleandGivePermission , getRoles, dropRoles};