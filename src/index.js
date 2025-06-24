const express = require('express')
const {ServerConfig,Logger} = require('./config')

const {AboutController,HomeController} = require('./controllers')

const apiRoutes = require('./routes')
const { where } = require('sequelize')

const app = express()

app.use(express.json())
app.use('/api',apiRoutes)

app.listen(ServerConfig.PORT,async() => {
    console.log(`Successfully Started the server on PORT: ${ServerConfig.PORT}`);
    // bad code alert
    const {City,Airport} = require('./models')
    // const bengaluru = await City.findByPk(1)
    // const hbAirport = await bengaluru.createAirport({name:'Huballi Airport',code: 'HLB'}) 
    // const airportInBlr = await bengaluru.getAirports()
    // console.log(airportInBlr)
    // const hbAirport = await Airport.findByPk(3)
    // await bengaluru.removeAirport(hbAirport)
    const city = await City.findByPk(13)
    // await city.createAirport({name:'Indore Airport',code:'IND'})
    await City.destroy({
        where: {
            id:13
        }
    })
});
