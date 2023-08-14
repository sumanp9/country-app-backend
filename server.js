var express = require('express');
var app = express();
var cors = require('cors');

var database = require('./connection.js');

app.use(cors());

app.get('/hello', function(req, res) {
    console.log("Sharing hello");
    res.end("Hello world how are we");
});

//getAll method to pull list of countries

app.get('/api/getCountries', function(req, res) {
    const query = `SELECT country_name FROM countries`;

    database.query(query, (err, results) => {
        if(err) {
            res.status(500).json({ error: 'Error executing query to get country list'});
        
        } else {
            res.json(results);
        }
    });
});

//getCapital method, parameter: name of country, return city

app.get('/api/getCapitalCity/:countryName', function(req, res) {
    const countryName = req.params.countryName;
    const query = `SELECT capital_city FROM countries where country_name=?`;
    
    database.query(query,[countryName], (err, results) => {
        if(err) {
            res.status(500).json({ error: 'Error executing query to get capital city'});
        
        } else {
            res.json(results);
        }
    });
});

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("listening at port", port);
})