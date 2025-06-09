const {AirplaneService} = require('../services')
const {StatusCodes} = require('http-status-codes')
const {ErrorResponse,SuccessResponse} = require('../utils/common')


/*
   POST : /airplanes for creating the airplane 
   req-body {modelNumber:'boeing777',capacity:200} 
*/
async function createAirplane(req,res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber : req.body.modelNumber,
            capacity : req.body.capacity
        })
        SuccessResponse.data = airplane;
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

async function getAirplanes(req,res){
    try {
        const airplanes = await AirplaneService.getAirplanes()
        SuccessResponse.data = airplanes
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
    createAirplane,
    getAirplanes
}