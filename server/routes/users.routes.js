const express = require('express')
const authenticateJWT = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')
const userController = require('../controllers/users.controller')
const router = express.Router()


router.get('/all',authenticateJWT, authorize('read','user'),userController.fethUserData)
router.post('/add-user', authenticateJWT, authorize('create','user'), userController.addUser)
router.put('/drop-user',authenticateJWT, authorize('delete','user'), userController.dropUser)


module.exports = router