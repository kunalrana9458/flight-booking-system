const express = require('express')
const router = express.Router()
const {AirportController} = require('../../controllers')
const {AirportMiddleware} = require('../../middlewares')

// /api/v1/airplanes - POST
router.post('/',
    AirportMiddleware.validateCreateRequest,
    AirportController.createAirport)

// /api/v1/airplanes - GET
router.get('/',
    AirportController.getAirports
)

// /api/v1/airplanes/:id - GET 
router.get('/:id',
    AirportController.getAirport
)

// /api/v1/airplanes/:id - DELETE 
router.delete('/:id',
    AirportController.destroyAirport
)

// /api/v1/airplanes/:id - PUT 
router.put('/:id',
    AirportController.updateAirport
)

module.exports = router