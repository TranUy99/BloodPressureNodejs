const express =require ("express");
const scheduleController= require ("../controllers/scheduleController");
const { checkToken } = require("../token/token");
let router = express.Router();

let auth = (app) => {
    
 
    router.post('/api/schedule/:id',checkToken,scheduleController.createSchedule);

    router.get('/api/scheduleDoctorId/:id',scheduleController.getScheduleByDoctorId);

    router.put('/api/schedule/:id',scheduleController.updateSchedule);
    return app.use("/", router);
}

module.exports = auth;