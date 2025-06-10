const { StatusCodes } = require("http-status-codes");
const { AirplaneRespository } = require("../repositories");
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

async function getAirplane(id){
    try {
        const airplane = await airplaneRespository.get(id)
        return airplane
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('Airplane you Requestes not Found',error.statusCode)
        }
        throw new AppError('Cannot fetch data of airplane by Id',StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function destroyAirplane(id){
  try {
    const response = await airplaneRespository.destroy(id)
    return response
  } catch (error) {
    console.log(error.statusCode)
    if(error.statusCode == StatusCodes.NOT_FOUND){
      throw new AppError('Airplane you are trying to delete is not Present',error.statusCode)
    }
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
};
