
const {FlightService} = require('../services')
const {StatusCodes} = require('http-status-codes')
const {ErrorResponse,SuccessResponse} = require('../utils/common')


/*
   POST : /flights for creating the flight 
   req-body {
     flightNumber: 'UK 808'
     airplaneId: 'a380'
     departureAirportId: 12
     arrivalAirportId: 11
     arrivalTime: '11:10:00'
     departureTime: '9:10:00'
     price: 8545
     boardingGate: '12A'
     totalSeats: 120
   } 
*/
async function createFlight(req,res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        })
        SuccessResponse.data = flight;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
        .status(500)
        .json(ErrorResponse)
    }
}

async function getAllFlights(req,res){
    try {
        const flights =  await FlightService.getAllFlights(req.query)
        SuccessResponse.data = flights
        return res
                 .status(StatusCodes.CREATED)
                 .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res 
                 .status(error.statusCode)
                 .json(ErrorResponse)
    }
}

/**
 * GET : /flight/:id
 * req-body {}
 */

async function getFlight(req,res) {
    try {
        const flight = await FlightService.getFlight(req.params.id)
        SuccessResponse.data = flight
        return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
                 .status(500)
                 .json(ErrorResponse)
    }
}

async function updateSeats(req,res){
    console.log("Update Seat Controller")
    try {
        const response = await FlightService.updateSeats({
            flightId:req.params.id,
            seats: req.body.seats,
            des: req.body.des
        })
        SuccessResponse.data = response
        return res 
                 .status(StatusCodes.OK)
                 .json(SuccessResponse)
    } catch (error) {
        console.log(error)
        ErrorResponse.error = error
        return res
                 .status(500)
                 .json(ErrorResponse)
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats  
}