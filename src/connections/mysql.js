const mysql = require('mysql2/promise');
require('dotenv').config() //NEED TO LOAD ENV VARS HERE

const pool = mysql.createPool({
    connectionLimit: 10,
    supportBigNumbers: true,
    port: '3306',
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME
});

(async () => {
    try {
        const [res] = await pool.execute('select 1');
        console.log("Mysql DB connected");
    } catch (error) {
        console.log("Error DB connection", error);
    }
})();
module.exports = pool