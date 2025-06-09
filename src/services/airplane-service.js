const { StatusCodes } = require("http-status-codes");
const { AirplaneRespository } = require("../repositories/airplane-repository");
const AppError = require("../utils/errors/app-error");

const airplaneRespository = new AirplaneRespository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRespository.create(data);
    return airplane;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplanes(){
      try {
        const airplanes = await airplaneRespository.getAll()
        return airplanes;
      } catch (error) {
        throw new AppError('Cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR)
      }
}

module.exports = {
  createAirplane,
  getAirplanes,
};
