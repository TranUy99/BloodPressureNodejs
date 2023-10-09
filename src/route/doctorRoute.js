const express =require ("express");
const doctorController =require ("../controllers/doctorController");
const { checkToken } = require("../token/token");
let router = express.Router();

let auth = (app) => {
    
 
    router.post('/api/doctor/register',doctorController.register);

    router.post('/api/doctor/login',doctorController.handleLogin);

    router.get('/api/doctor/:id',checkToken,doctorController.getDoctorById);
    router.get('/api/getDoctor',doctorController.getDoctor);
    router.put('/api/doctor/:id', checkToken, doctorController.updateDoctorData);
    return app.use("/", router);
}

module.exports = auth;