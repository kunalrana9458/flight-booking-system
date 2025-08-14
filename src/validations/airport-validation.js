const Joi = require('joi')

const airportSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    code: Joi.string().uppercase().length(3).required(),
    address: Joi.string().min(5).max(255).required(),
    cityId: Joi.number().integer().positive().required()
})

module.exports = {airportSchema}