const express = require('express')
const router = express.Router()
const {InfoController} = require('../../controllers/index')

const airplaneRoutes = require('./airplane-routes')
const cityRoutes = require('./city-route')

router.get('/info',InfoController.infoController)
router.use('/airplanes',airplaneRoutes)
router.use('/cities',cityRoutes)

module.exports = router