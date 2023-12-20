const { v4 } = require('uuid');
const { UsersModel } = require('../models');
const { ResponseHandler, Constants } = require('../utils');

class UserController{

    async getAllUsers(req, res) {
        try {
            const response = await UsersModel.getAllUsers();
            return ResponseHandler(res, Constants.StatusCodes.Ok, "Success", response)
        } catch (error) {
            return ResponseHandler(res, Constants.StatusCodes.InternalServerError, "Something went wrong !!")
        }
    }
    
    async getUser(req, res) {
        try {
            const { userId } = req.params
            if (!(userId && typeof userId === 'string' && userId.length)) return ResponseHandler(res, Constants.StatusCodes.BadRequest, "Invalid user id")
            
            const response = await UsersModel.getUserById(userId);
            if (!response) 
                return ResponseHandler(res, Constants.StatusCodes.NotFound, "User not found")

            return ResponseHandler(res, Constants.StatusCodes.Ok, "Success", response)
        } catch (error) {
            return ResponseHandler(res, Constants.StatusCodes.InternalServerError, "Something went wrong !!")
        }
    }
    
    async createUser(req, res) {
        try {
            const { username, age, hobbies } = req.body
            if (!(username && age && typeof age === 'number' && hobbies && typeof hobbies === 'object' && hobbies.length)) {
                return ResponseHandler(res, Constants.StatusCodes.BadRequest, "Provide valid data")
            }
            const insertData = {
                id : v4().replace(/-/g,""), 
                username : username, 
                age: age, 
                hobbies: hobbies
            }
            const response = await UsersModel.createUser(insertData);
            return ResponseHandler(res, Constants.StatusCodes.Created, "Successfully created user", insertData)
        } catch (error) {
            console.log(error);
            return ResponseHandler(res, Constants.StatusCodes.InternalServerError, "Something went wrong !!")
        }
    }
    
    async updateUser(req, res) {
        try {
            const { userId } = req.params
            const { username, age, hobbies } = req.body
            const response = await UsersModel.getUserById(userId);
            if (!response) {
                return ResponseHandler(res, Constants.StatusCodes.NotFound, "User not found")
            }
            if (!(username && age && typeof age === 'number' && hobbies && typeof hobbies === 'object' && hobbies.length)) {
                return ResponseHandler(res, Constants.StatusCodes.BadRequest, "Provide valid data")
            }
            const updatedData = {
                id : response.id,
                username : username, 
                age: age, 
                hobbies: hobbies
            }
            const responseUpdate = await UsersModel.updateUser(response.id, updatedData);
            if (!responseUpdate) 
                throw "Unable to update";

            return ResponseHandler(res, Constants.StatusCodes.Ok, "Success", updatedData)
        } catch (error) {
            console.log(error);
            return ResponseHandler(res, Constants.StatusCodes.InternalServerError, "Something went wrong !!")
        }
    }
    
    async deleteUser(req, res) {
        try {
            const { userId } = req.params
            if (!(userId && typeof userId === 'string' && userId.length)) 
                return ResponseHandler(res, Constants.StatusCodes.BadRequest, "Invalid user id")

            const response = await UsersModel.deleteUser(userId);
            return ResponseHandler(res, Constants.StatusCodes.Ok, "Success", {})
        } catch (error) {
            return ResponseHandler(res, Constants.StatusCodes.InternalServerError, "Something went wrong !!")
        }
    }
}

module.exports = new UserController();
