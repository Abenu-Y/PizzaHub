const { AbilityBuilder, Ability ,} = require('@casl/ability');
const db = require('../config/db.config'); // PostgreSQL connection

async function defineAbilitiesFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  try {
    // Query user's role and permissions from the database
    const rolePermissionsQuery = `
      SELECT rp.resource, rp.action 
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      JOIN role_permissions rp ON r.id = rp.role_id
      WHERE ur.user_id = $1 AND ur.restaurant_id = $2
    `;

    console.log("0",user.restaurantId)

    const { rows: permissions } = await db.query(rolePermissionsQuery, [user.id, user.restaurantId[0].restaurant_id]);
//    console.log(permissions)
    // Handle case where user has no permissions
    if (permissions.length === 0) {
      console.log('No permissions found for user:', user.id);
    }

    // Define abilities based on user's permissions
    permissions.forEach(({ resource, action }) => {
      can(action, resource); // e.g., can('read', 'orders')
    });
  } catch (error) {
    console.error('Error fetching permissions:', error);
    throw new Error('Unable to define abilities due to permission fetch error.');
  }

  return build();
}

module.exports = defineAbilitiesFor;
