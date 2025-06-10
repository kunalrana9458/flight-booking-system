const {StatusCodes} = require('http-status-codes')
const {Logger} = require('../config')
const AppError = require('../utils/errors/app-error')

class CrudRepository {
    constructor(model){
        this.model = model
    }

    async create(data){
        try {
            const response = await this.model.create(data)
            return response
        } catch (error) {
            console.log(error)
            Logger.error(`Something went wrong in the crud Repo: create`)
            throw error
        }
    }

    async destroy(data){
        try {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            })
            console.log(!response)
            if(!response){
                throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND)
            }
            console.log(response)
            return response
        } catch (error) {
            Logger.error(`Something went wrong in the crud Repo: destroy`)
            throw error
        }
    }

    async get(data){
        try {
            const response = await this.model.findByPk(data)
            if(!response){
                throw new AppError('Not able to found the resource',StatusCodes.NOT_FOUND)
            }
            return response;
        } catch (error) {
            Logger.error(`Something went wrong in the Crud Repo: get`)
            throw error
        }
    }

    async getAll() {
        try {
            const response = await this.model.findAll()
            return response
        } catch (error) {
            Logger.error(`Something went wrong in the CRUD Repo : getAll`)
            throw error
        }
    }

    async update(id,data){
        try {
            const response = await this.model.update(data,{
                where: {
                    id:id
                }
            })
            return response
        } catch (error) {
            Logger.info(`Something went wrong in the CRUD : Update`)
            throw error
        }
    }
}

module.exports = CrudRepository