const {CityService} = require('../services')
const {StatusCodes} = require('http-status-codes')
const {ErrorResponse,SuccessResponse} = require('../utils/common')

/*
   POST : /cities for creating the airplane 
   req-body {name:'London'} 
*/
async function createCity(req,res) {
    try {
        const city = await CityService.createCity({
            name : req.body.name
        })
        SuccessResponse.data = city;
        return res
        .status(StatusCodes.CREATED)
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
    createCity
}
