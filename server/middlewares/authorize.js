const defineAbilitiesFor = require('./roleBasedAccessControl');

const authorize = (action, resource) => {
    return async (req, res, next) => {
        try {
            const { restaurantId } = req.body
            req.user.restaurantid = restaurantId;
            const ability = await defineAbilitiesFor(req.user); // Define abilities based on the logged-in user
            // console.log(ability)

            if (ability.can(action, resource)) {
                return next(); // User has permission
            } else {
                return res.status(403).json({ message: 'Forbidden' });
            }
        } catch (error) {
            console.error('Authorization error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
};

module.exports = authorize;
