const dotenv = require('dotenv');
dotenv.config();

const { DB_USER, DB_PASS, DB_NAME, CLOUD_SQL_CONNECTION_NAME } = process.env;

module.exports = {
    devConfig: {
        host: 'localhost',
        dialect: 'mysql',
        password: '',
        database: 'dive'
    },
    prodConfig: {
        user: DB_USER, // e.g. 'my-db-user'
        password: DB_PASS, // e.g. 'my-db-password'
        database: DB_NAME, // e.g. 'my-database'
        // If connecting via unix domain socket, specify the path
        socketPath: `/cloudsql/${CLOUD_SQL_CONNECTION_NAME}`,
    },
    testConfig: {
        
    }
}