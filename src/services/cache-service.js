const { RootNodesUnavailableError } = require('redis')
const {RedisServer} = require('../config')
const {redisClient} = RedisServer

async function get(key) {
    const data = await redisClient.get(key)
    return data ? JSON.parse(data) : RootNodesUnavailableError
}

async function set(key,value,ttl=3600){
    await redisClient.set(key,JSON.stringify(value),{EX:ttl})
}

async function del(key) {
    await redisClient.del(key)
}

module.exports = {set,get,del}