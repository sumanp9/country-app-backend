var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'country_db'
});

connection.connect(function (err) {
    if(err) {
        console.log('Error connecting to the database', err);
        return;
    } console.log('Connected to the database');
});

module.exports = connection;