// const { Client } = require('pg');
const { Pool } = require('pg')
const { config } = require('../config/config')

const   USER = encodeURIComponent(config.dbUser)
const  PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
// async function getConnection() {    
//     const client = new Client({
//         host: 'localhost',
//         port: 5437,
//         user: 'user',
//         password: 'thebest1',
//         database: 'my_api',
//     });
//     await client.connect();
//     return client;
// }
    const pooltest = new Pool({
        connectionString: URI
        //         host: 'localhost',
        // port: 5437,
        // user: 'user',
        // password: 'thebest1',
        // database: 'my_api',
    });


    
module.exports = pooltest;
