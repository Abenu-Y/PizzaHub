const express = require('express')
const router = express.Router()
const roleControllers = require('../controllers/role.controller');
const authenticateJWT = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');


router.post('/create-role',authenticateJWT,authorize('create','role'),roleControllers.createRole);
router.get('/roles',authenticateJWT,authorize('read','role'),roleControllers.getRoles)
router.put('/drop',authenticateJWT,authorize('delete','role'), roleControllers.dropRoles)


module.exports = router
