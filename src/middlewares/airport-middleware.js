const {StatusCodes} = require('http-status-codes')

const {ErrorResponse} = require('../utils/common')
const AppError = require('../utils/errors/app-error')

function validateCreateRequest (req,res,next){
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating airport'
        ErrorResponse.error = new AppError(['Name is not find in the oncoming request in the body'],StatusCodes.BAD_REQUEST)
        return res
               .status(StatusCodes.BAD_REQUEST)
               .json(ErrorResponse)
    }
    if(!req.body.code){
        ErrorResponse.message = 'Something went wrong while creating airport'
        ErrorResponse.error = new AppError(['Airport code not found in the oncoming request in the body'],StatusCodes.BAD_REQUEST)
        return res
               .status(StatusCodes.BAD_REQUEST)
               .json(ErrorResponse)
    }
    if(!req.body.cityId){
        ErrorResponse.message = 'Something went wrong while creating airport'
        ErrorResponse.error = new AppError(['CityId not found in the oncoming request in the body'],StatusCodes.BAD_REQUEST)
        return res
               .status(StatusCodes.BAD_REQUEST)
               .json(ErrorResponse)
    }
    next()
}

module.exports = {
    validateCreateRequest
}