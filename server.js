var express = require('express');
var app = express();
var cors = require('cors');

var database = require('./connection.js');

app.use(cors());
app.use(express.json());


app.get('/hello', function(req, res) {
    console.log("Sharing hello");
    res.end("Hello world how are we");
});

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


app.get('/api/getCapitalCity/:countryName', function(req, res) {
    const countryName = req.params.countryName;
    const query = `SELECT capital_city FROM countries where country_name=?`;
    database.query(query,[countryName], (err, results) => {
        if(err) {
            console.error(err)
            res.status(500).json({ error: 'Error executing query to get capital city'});
        
        } else {
            res.json(results);
        }
    });
});


app.post('/api/addCountryDetails', function(req, res) {
    const countryData = req.body;
    console.log(countryData.capital);
    const query = `INSERT INTO Countries (country_name, capital_city) VALUES (?,?)`;
    const values = [countryData.country_name, countryData.capital];

    database.query(query, values,  (err, results) => {
        if(err) {
            console.error('Error executing query to add country details:', err);
            res.status(500).json({ error: 'Error executing query to add country details'});
        } else {
            console.log('Country added successfully');
            res.status(201).json({message: 'Country object recieved and processed successfully'})
        }
    });  

})

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("listening at port", port);
})