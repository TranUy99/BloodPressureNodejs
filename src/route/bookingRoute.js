import express from "express";
import bookingController from "../controllers/bookingController";
const { checkToken } = require("../token/token");
let router = express.Router();

let auth = (app) => {
    
 
    router.post('/api/booking',bookingController.createBooking);
    router.get('/api/booking/:id',checkToken,bookingController.getBookingByUserId);
    return app.use("/", router);
}

module.exports = auth;