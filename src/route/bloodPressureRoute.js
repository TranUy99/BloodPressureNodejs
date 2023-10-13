const express = require("express");
const bloodPressureController = require ("../controllers/bloodPressureController");
const { checkToken } = require("../token/token");
let router = express.Router();

let auth = (app) => {
    
 
    router.post('/api/blood-pressure/:id',checkToken,bloodPressureController.createBloodPressure);
    router.get('/api/blood-pressure/:id',bloodPressureController.getBloodById);
    router.get('/api/blood-pressure/user/:id',checkToken,bloodPressureController.getBloodPressureByUserId);
    router.get('/api/blood-pressure/reverse/:id',checkToken,bloodPressureController.getBloodPressureByUserIdReverse);
    
    return app.use("/", router);
}

module.exports = auth;