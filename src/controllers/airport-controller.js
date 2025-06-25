
const {AirportService} = require('../services')
const {StatusCodes} = require('http-status-codes')
const {ErrorResponse,SuccessResponse} = require('../utils/common')


/*
   POST : /airports for creating the airplane 
   req-body {name:'IGI',code:'DEL,address:'Delhi',cityId:'14'} 
*/
async function createAirport(req,res) {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        })
        SuccessResponse.data = airport;
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

/*
   GET : /airports - for fetching the details of all the airports from airports table
*/
async function getAirports(req,res){
    try {
        const airports = await AirportService.getAirports()
        SuccessResponse.data = airports
        return res
               .status(StatusCodes.OK)
               .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
               .status(error.statusCode)
               .json(ErrorResponse)
    }
}

/*
  GET : /airports/:id 
  req-body {}
*/
async function getAirport(req,res){
    try {
        const airport = await AirportService.getAirport(req.params.id)
        SuccessResponse.data = airport
        return res
               .status(StatusCodes.OK)
               .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}


/*
  DELETE : /airports/:id
  req-body {}
*/
async function destroyAirport(req,res) {
    try {
        const airports = await AirportService.destroyAirport(req.params.id)
        SuccessResponse.data = airports
        return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
                 .status(error.statusCode)
                 .json(ErrorResponse)   
    }
}


async function updateAirport(req,res) {
    try {
        const updateDetails = req.body
        const airport = await AirportService.updateAirport(req.params.id,updateDetails)
        SuccessResponse.data = airport
        return res 
                 .status(StatusCodes.OK)
                 .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}