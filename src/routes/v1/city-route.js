const express = require('express')
const router = express.Router()
const {CityController} = require('../../controllers')
const {CityMiddleware} = require('../../middlewares')


// /api/v1/city - POST
router.post('/',
    CityMiddleware.validateCreateRequest,
    CityController.createCity)



module.exports = router