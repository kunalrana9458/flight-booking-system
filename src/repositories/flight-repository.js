const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport } = require("../models");
const { Sequelize } = require("sequelize");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    if (Object.keys(sort).length === 0 && sort.constructor === Object) {
         sort = []; // convert empty object to the empty array because order takes only array
    }
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          required: true,
          as: "airplane_detail",
        },
        {
          model: Airport,
          required: true,
          as: "departure_airport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departure_airport.Code")
            ),
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrival_airport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrival_airport.Code")
            ),
          },
        },
      ],
    });
    return response;
  }
}

module.exports = FlightRepository;
