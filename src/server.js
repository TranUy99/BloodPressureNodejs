import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/view_engnine";
import auth from './route/authRoute';
import connectDB  from './config/connectDB';
require('dotenv').config();

let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

configViewEngine(app);

auth(app);

connectDB();
let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})