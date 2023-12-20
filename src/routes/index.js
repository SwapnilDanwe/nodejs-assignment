const express = require('express');
const router = express.Router();
const usersRoutes = require('./users');

router
    .use('/users', usersRoutes)
    
    // Handle non-existing endpoints
    .use('/', (req, res) => {
        return res.status(404).send({ message: 'Not Found' });
    })
module.exports = router;
