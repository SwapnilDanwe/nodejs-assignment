const redis = require('../connections/redis');

class Users {
    constructor(){
        this.redisKey = 'users'
    }

    async getAllUsers(){
        const result = await redis.hGetAll(this.redisKey)
        let response = result ? Object.values(result).map(e => JSON.parse(e)) : []
        return response
    }
    
    async getUserById(userId){
        const result = await redis.hGet(this.redisKey, userId)
        return result ? JSON.parse(result) : null
    }

    async createUser(insertData){
        const result = await redis.hSet(this.redisKey, insertData.id, JSON.stringify(insertData))
        return result ? true : false
    }

    async updateUser(userId, updateData){
        console.log(userId, JSON.stringify(updateData));
        const result = await redis.hSet(this.redisKey, userId, JSON.stringify(updateData))
        return result ? true : false
    }

    async deleteUser(userId){
        const result = await redis.hDel(this.redisKey, userId)
        return result ? true : false
    }
}

module.exports = new Users();