const express = require('express')
const router = express.Router()
const {InfoController} = require('../../controllers/index')

const airplaneRoutes = require('./airplane-routes')

router.get('/info',InfoController.infoController)
router.use('/airplanes',airplaneRoutes)

module.exports = router