const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport } = require("../models");
const { Sequelize, where } = require("sequelize");
const db = require("../models");
const { addRowLockOnFlights } = require("./queries");

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

  async updateRemainingSeats(flightId, seats, des = 1) {
    try {
      const transaction = await db.sequelize.transaction();
      await db.sequelize.query(addRowLockOnFlights(flightId));
      const flight = await Flight.findByPk(flightId);
      if (Number(des)) {
        await flight.decrement(
          "totalSeats",
          {
            by: seats,
          },
          { transaction: transaction }
        );
      } else {
        await flight.increment(
          "totalSeats",
          {
            by: seats,
          },
          { transaction: transaction }
        );
      }
      await transaction.commit();
      return flight;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;
