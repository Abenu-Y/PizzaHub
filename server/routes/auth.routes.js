const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const authenticateJWT = require('../middlewares/authenticate')

router.post('/register',authController.userRegistration)
router.post('/signin',authController.login)
router.post('/super_admin_register',authenticateJWT,authController.superAdminRegistration)

module.exports = router