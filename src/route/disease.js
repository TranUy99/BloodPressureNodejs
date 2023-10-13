const express = require ("express");
const diseaseController  = require ("../controllers/diseaseController");

let router = express.Router();

let auth = (app) => {
    
 
    router.post('/api/disease',diseaseController.register);


    return app.use("/", router);
}

module.exports = auth;