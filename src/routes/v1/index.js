const express = require('express')
const router = express.Router()
const {InfoController} = require('../../controllers/index')

const airplaneRoutes = require('./airplane-routes')
const cityRoutes = require('./city-route')
const airportRoutes = require('./airport-routes')
const flightRoutes = require('./flight-route')

router.get('/info',InfoController.infoController)
router.use('/airplanes',airplaneRoutes)
router.use('/cities',cityRoutes)
router.use('/airports',airportRoutes)
router.use('/flights',flightRoutes)

module.exports = router