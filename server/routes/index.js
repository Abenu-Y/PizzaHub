const express = require('express')
const router = express.Router()

const install = require('./install.routes')
const authRoutes = require('./auth.routes')

router.use(install)
router.use('/api/auth',authRoutes)

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