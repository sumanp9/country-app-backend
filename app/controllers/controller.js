const { where } = require("sequelize");
const db = require("../models/index");
const CountryDB = db.country;

exports.findAll = (req, res) => {
    
    CountryDB.country.findAll()
    .then((countries) => {
        res.send(countries);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({message: "internal server error"});
    });
};

exports.findAllCities = (req, res) => {
    const  countryId = req.query.id;


    CountryDB.city.findAll({
        where: {
            country_id: countryId,
        },
        attributes: ['id', 'name'],
    }) 
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Error occured while retrieving cities."
        })
    })
}

exports.findCapital = (req, res) => {
    const countryId = req.query.id;

    CountryDB.country.findOne({
        where: {
            id: countryId
        },
        attributes:['capital_city']
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || 'Error occured while retrieving capital city.'
        })
    })
}

exports.createcountry = (req, res) => {
    if (!req.body.country_name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

      const countryData = {
         country_name: req.body.country_name,
        capital_city: req.body.capital
      };

      CountryDB.country.create(countryData)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating country."
          });
      })

}

exports.createcity = (req, res) => {

    console.log("createcity method")


    if(!req.body.name || !req.body.country_id) {
        res.status(400).send({
            message: "Content can not be empty!"
          });
          return;
    }

    const cityData = {
        name: req.body.name,
        country_id: req.body.country_id
    };

    console.log(cityData);

    CountryDB.city.create(cityData)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating city."
          });
      })

}

exports.deleteCountry = async (req, res) => {
   const id = req.query.id;
   try {
    if (!id) {
      return res.status(400).json({ message: "Id cannot be empty!" });
    }

    const cityDeletionResult = await CountryDB.city.destroy({
      where: { country_id: id },
      truncate: false
    });

    const countryDeletionResult = await CountryDB.country.destroy({
      where: { id: id },
      truncate: false
    });

    if (countryDeletionResult === 1) {
      res.json({ message: `country with ID ${id} and associated cities were deleted successfully.` });
    } else {
      res.status(404).json({ message: `country with ID ${id} not found or no associated cities to delete.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the country and associated cities." });
  }
};

exports.deleteCity = (req, res) => {
  const id  = req.query.id;

  if(!id) {
    res.status(400).send({
        message: "id cannot be empty!"
    })
    return;
   }

   CountryDB.city.destroy({
    where: {id: id},
   })
    .then(result => {
        if (result == 1) {
            res.send({
              message: "city was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete city with id=${id}. Maybe Tutorial was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete city with id=" + id
          });
        });

};


exports.updateCity = (req, res) => {

    console.log("updateCity method")
    const {id, name} = req.body;
    
    CountryDB.city.update(
        {name},
        {where: {id}}
        )    
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "city updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update city with id ${id}.`
                });
            }
        })

        .catch(err => {
            res.status(500).send({
                message: "Error updating city with id="+ id
            });
        });
  
};

exports.updateCountry = (req, res) => {

    const {id, country_name} = req.body;

    
    CountryDB.country.update(
        {country_name},
        {where: {id}}
    )
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "country updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update country with id ${id}.`
                });
            }
        })

        .catch(err => {
            res.status(500).send({
                message: "Error updating country with id="+ id
            });
        });
};

exports.updateCapital = (req, res) => {
    const {id, capital_city} = req.body;
    CountryDB.country.update(
        {capital_city},
        {where: {id}}
    ).
        then(num => {
            if(num == 1) {
                res.send({
                    message: "Capital updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Capital with country id ${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Capital of a country with id= "+ id
            });
        });
};
