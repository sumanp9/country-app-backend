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
    const query = `SELECT id, country_name FROM countries`;

    database.query(query, (err, results) => {
        if(err) {
            res.status(500).json({ error: 'Error executing query to get country list'});
        
        } else {
            res.json(results);
        }
    });
});


app.get('/api/getCapitalCity/:id', function(req, res) {
    const id = req.params.id;
    const query = `SELECT capital_city FROM countries where id=?`;
    database.query(query,[id], (err, results) => {
        if(err) {
            console.error(err)
            res.status(500).json({ error: 'Error executing query to get capital city'});
        
        } else {
            if(results.length > 0) {
                res.json(results[0]);
            } else {
            res.json({capital_city: ''});
            }
        }
    });
});


app.post('/api/addCountryDetails', function(req, res) {
    const countryData = req.body;
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

app.put('/api/updateCountry', function(req, res){
    const countryData = req.body;
    const query = `UPDATE countries SET country_name=?, capital_city=? Where id=?`;
    const values = [countryData.country_name, countryData.capital, countryData.id];


    database.query(query, values, (err, results) => {
        if(err) {
            console.error('Error executing query to update country details:', err);
            res.status(500).json({ error: 'Error executing query to update country details'});
        } else {
            console.log('Country updated successfully');
            res.status(201).json({message: 'Country object recieved and updated successfully'})
        }
    })
})

app.delete('/api/deleteCountryData/:id', function(req, res) {
    const countryId = req.params.id;
    const query = `DELETE FROM countries where id=?`;
    database.query(query, [countryId], (err, results) => {

        if(err){
            console.log(err);
            res.status(500).json({error: 'Error executing query to delete'});
        } else{
            console.log("delted country with id: "+  countryId)
            res.status(204).json();
        }

    })
})

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("listening at port", port);
})