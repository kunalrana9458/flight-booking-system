const express = require('express')
const router = express.Router()
const {CityController} = require('../../controllers')
const {CityMiddleware} = require('../../middlewares')


// /api/v1/cities - POST
router.post('/',
    CityMiddleware.validateCreateRequest,
    CityController.createCity)

// /api/v1/cities/:id - DELETE
router.delete('/:id',
    CityController.destroyCity
)



module.exports = router