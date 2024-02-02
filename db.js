const pg = require("pg");
require("dotenv").config();

const pool = new pg.Pool({
    user: process.env.user,
    password: process.env.pass,
    database: process.env.db,
    host: process.env.host,
    port: process.env.port
});

module.exports = pool;