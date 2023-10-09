const express = require( "express");
const bookingController = require ("../controllers/bookingController");
const { checkToken } = require("../token/token");
let router = express.Router();

let auth = (app) => {
    
 
    router.post('/api/booking',bookingController.createBooking);
    router.get('/api/booking/:id',checkToken,bookingController.getBookingByUserId);
    return app.use("/", router);
}

module.exports = auth;