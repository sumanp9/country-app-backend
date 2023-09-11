var express = require('express');
var app = express();
var cors = require('cors');

var database = require('./connection.js');

app.use(cors());
app.use(express.json());

// Update the api signature accoriding to swagger ui's rest endpoints

app.get('/api/countries', function(req, res) {
    const query = `SELECT id, country_name FROM countries`;

    database.query(query, (err, results) => {
        if(err) {
            res.status(500).json({ error: 'Error executing query to get country list'});
        
        } else {
            res.json(results);
        }
    });
});


app.get('/api/capital/:id', function(req, res) {
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

app.get('/api/cities/:id', function(req, res) {
    const country_id = req.params.id;
    const query = `SELECT id, name from cities where country_id =?`;
    database.query(query, [country_id], (err, results) => {
        if(err) {
            console.error(err);
            res.status(500).json({error: 'Error executing query to retireve  cities'});
        } else {
            res.json(results);
        }
    })
})


app.post('/api/countrydetails', function(req, res) {
    const countryData = req.body;
    const query = `INSERT INTO Countries (country_name, capital_city) VALUES (?,?)`;

  //  this.validateCountry(countryData);
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

app.put('/api/country', function(req, res){
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

app.delete('/api/country/:id', function(req, res) {
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

app.post('/api/city', function(req, res) {
    const countryId = req.body.countryId;
    const cityName = req.body.cityName;
    const cityId = req.body.id;

    if(cityId == 0) {
        const query=`INSERT INTO Cities (country_id, name) VALUES (?,?)`;
        const values = [countryId, cityName];
        database.query(query, values,  (err, results) => {
            if(err) {
                console.error('Error executing query to add city details:', err);
                res.status(500).json({ error: 'Error executing query to add city details'});
            } else {
                console.log('City added successfully');
                res.status(201).json({message: 'City object recieved and processed successfully'})
            }
        });  

    } else {
        const query = `UPDATE cities SET name=? Where id=?`;
    const values = [cityName, cityId];


    database.query(query, values, (err, results) => {
        if(err) {
            console.error('Error executing query to update city details:', err);
            res.status(500).json({ error: 'Error executing query to update city details'});
        } else {
            console.log('City updated successfully');
            res.status(201).json({message: 'City object recieved and updated successfully'})
        }
    })
    }
})

app.delete('/api/city/:cityId', function(req, res) {
    const cityId = req.params.cityId;

    const query = "DELETE FROM Cities Where id=?";
    database.query(query, [cityId], (err, results) => {
        if(err){
            console.log(err);
            res.status(500).json({error: 'Error executing query to delete'});
        } else{
            console.log("delted country with id: "+  cityId)
            res.status(204).json();
        }
    })
})


var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("listening at port", port);
})