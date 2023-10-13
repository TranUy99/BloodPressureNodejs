const express = require ("express");
const bodyParser = require  ("body-parser");
const configViewEngine = require  ("./config/view_engnine");
const auth = require  ('./route/authRoute');
const connectDB  = require  ('./config/connectDB');
const bloodPressureRouter = require  ("./route/bloodPressureRoute");
const doctorRouter = require  ("./route/doctorRoute");
const scheduleRouter = require  ("./route/scheduleRoute");
const bookingRouter = require  ("./route/bookingRoute");
const diseaseRouter = require("./route/disease")
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
diseaseRouter(app);

connectDB();
let port = process.env.PORT || 8080;
//Port === undefined => port = 6969

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})