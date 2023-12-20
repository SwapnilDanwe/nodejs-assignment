const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router
    .get('/', UserController.getAllUsers)
    
    .get('/:userId', UserController.getUser)
    
    .post('/', UserController.createUser)
    
    .put('/:userId', UserController.updateUser)
    
    .delete('/:userId', UserController.deleteUser)

module.exports = router;
