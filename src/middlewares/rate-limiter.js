const rateLimiter = require('express-rate-limit')


const searchFlightLimiter = rateLimiter({
    windowMs: 10*60*1000,
    max: 10,
    message: 'Too Many Flight Search Request. Please try again later',
    standardHeaders: true,
    legacyHeaders: false
})

module.exports = {searchFlightLimiter}