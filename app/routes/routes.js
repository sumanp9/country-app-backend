module.exports = app => {
    const countries = require("../controllers/controller");
  
    var router = require("express").Router();
  
    router.get("/countries", countries.findAll);

    router.get("/cities", countries.findAllCities);

    router.get("/capital", countries.findCapital);

    router.post("/country", countries.createCountry);

    router.post("/city", countries.createCity);

    router.put("/city", countries.updateCity);

    router.put("/country", countries.updateCountry);

    router.put("/capital", countries.updateCapital)

    router.delete("/country", countries.deleteCountry);

    router.delete("/city", countries.deleteCity);

  
    app.use(router);

    
};