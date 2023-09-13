    const controller = require("../controllers/controller.js");

    var router = require("express").Router();

    router.get("/api/v1/countries", controller.findAll);
    