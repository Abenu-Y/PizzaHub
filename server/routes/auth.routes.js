const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')


router.post('/register',authController.userRegistration)
router.post('/signin',authController.login)
router.post('/super_admin_register',authController.superAdminRegistration)

module.exports = router