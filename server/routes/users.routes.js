const express = require('express')
const authenticateJWT = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const userController = require('../controllers/users.controller')
const router = express.Router()


router.get('/all',authenticateJWT, authorize('read','user'),userController.fethUserData)


module.exports = router