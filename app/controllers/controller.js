const db = require("../models");
const CountryDB = db.country;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

};

exports.findAll = (req, res) => {

    CountryDB.Country.findAll()
    .then((countries) => {
        res.json(countries);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({message: "internal server error"});
    });

};

exports.findOne = (req, res) => {

};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};