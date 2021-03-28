const database = require('mysql2')

module.exports = database.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: "3306",
    password: '1234567890',
    database: 'AppChat'
});