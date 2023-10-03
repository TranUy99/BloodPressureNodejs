import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/view_engnine";
import auth from './route/authRoute';
import connectDB  from './config/connectDB';
import bloodPressureRouter from "./route/bloodPressureRoute";
import doctorRouter from "./route/doctorRoute";
import scheduleRouter from "./route/scheduleRoute";
import bookingRouter from "./route/bookingRoute";
require('dotenv').config();

let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

configViewEngine(app);

auth(app);
bloodPressureRouter(app);
doctorRouter(app);
scheduleRouter(app);
bookingRouter(app);

connectDB();
let port = process.env.PORT || 8000;
//Port === undefined => port = 6969

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})