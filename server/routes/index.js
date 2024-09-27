const express = require('express')
const router = express.Router()

const install = require('./install.routes')

router.use(install)

module.exports = router