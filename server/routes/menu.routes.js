const express = require('express');
const authenticateJWT = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const menuController = require('../controllers/menu.controller')
const router = express.Router()


router.post('/add',authenticateJWT, authorize('create','menu'),menuController.addMenu)


module.exports = router;