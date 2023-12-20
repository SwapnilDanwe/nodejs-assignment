const express = require('express');
const routes = require('./src/routes');
const morgan = require('morgan');
const { ResponseHandler } = require('./src/utils');
//const mysql = require('./src/connections/mysql');
const redis = require('./src/connections/redis');
require('dotenv').config()

const app = express();
app
    .use(morgan(':method :url :status :res[content-length] - :response-time ms'))

    .use(express.json())

    .use(express.urlencoded({extended: false}))

    .use('/api', routes)

    // Error handling middleware
    .use((err, req, res, next) => {
        console.error(err.stack);
        return ResponseHandler(res, 500, 'Something went wrong!');
    });

module.exports = app
