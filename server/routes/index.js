const express = require('express')
const router = express.Router()

const install = require('./install.routes')
const authRoutes = require('./auth.routes')
const roleRoutes = require('./role.routes')
const userRoutes = require('./users.routes')
const orderRoutes = require('./orders.routes')
const menuRoutes = require('./menu.routes')

router.use(install)
router.use('/api/auth',authRoutes)
router.use('/api/role',roleRoutes)
router.use('/api/user',userRoutes)
router.use('/api/order', orderRoutes)
router.use('/api/menu', menuRoutes)

router.use((err,req,res, next)=>{
    const statusCode = err?.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success:false,
         statusCode,
         message
    })
})

module.exports = router