const {AirplaneRespository} = require('../repositories/airplane-repository')

const airplaneRespository = new AirplaneRespository()

async function createAirplane(data) {
    try {
        const airplane = await airplaneRespository.create(data)
        return airplane
    } catch (error) {
        throw error
    }
}

module.exports = {
    createAirplane
}