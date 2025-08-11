const express = require('express')
const router = express.Router()
const {FlightController} = require('../../controllers')
const {FlightMiddleware} = require('../../middlewares')
const {RateLimiter} = require('../../middlewares')

// /api/v1/flights - POST
router.post('/',
    FlightMiddleware.validateCreateRequest,
    FlightController.createFlight)

// /api/v1/flights?trips=MUM-DEL - GET
router.get('/',
    RateLimiter.searchFlightLimiter,
    FlightController.getAllFlights)


// /api/v1/flights/:id
router.get('/:id',
    FlightController.getFlight
)    

// /api/v1/flights/:id/seats
router.patch('/:id/seats',
    // FlightMiddleware.validateUpdateSeatsRequest,
    FlightController.updateSeats
)

module.exports = router