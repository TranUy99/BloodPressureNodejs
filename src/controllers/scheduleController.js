const scheduleService = require('../services/scheduleService');

const userController = require('./userController');
//create BloodPressure
let createSchedule = async (req, res) => {
     let doctorId = req.params.id;
     let token = req.decoded.doctorId;
     let { time, workDate, statusId ,} = req.body;
   
     if (!time || !workDate || !statusId) {
       return res.status(500).json({
         errCode: 1,
         message: 'Missing inputs parameter!'
       });
     }
   
     try {
       let createSchedule = await scheduleService.createSchedule(doctorId, token, time, workDate, statusId);
       console.log(createSchedule)
       return res.status(200).json({
         errCode: createSchedule.errCode,
         message: createSchedule.errMessage,
         schedule: createSchedule.schedule
       });
     } catch (error) {
       return res.status(500).json({
         errCode: -1,
         message: 'An error occurred while registering schedule!'
       });
     }
};
let getScheduleByDoctorId = async (req,res) => {
     let doctorId = req.params.id;
     const workDate = req.query.workDate 
     try {
     //   if (doctorId != token) {
     //     return res.status(403).json({
     //       errCode: 403,
     //       message: "Access denied. You are not authorized to view this user's data."
     //     });
     //   }
   
       let result = await scheduleService.getScheduleByDoctorId(doctorId,workDate);
       if (result.errCode == 0) {
         const excludedFields = ['createdAt', 'updatedAt',];
       
         const filteredSchedule = result.schedule.map(item => {
           return userController.excludeFields(item, excludedFields);
         });
   
         return res.status(200).json({
           errCode: 0,
           message: 'OK',
          
           schedule: filteredSchedule,
         });
       } else {
         return res.status(400).json({
           errCode: 400,
           message: 'Bad request'
         });
       }
     } catch (error) {
       console.error(error);
       return res.status(500).json({
         errCode: 4,
         message: 'Failed server'
       });
     }
   };

   let updateSchedule = async(req,res) =>{
     let scheduleId = req.params.id;
     try {
          //   if (doctorId != token) {
          //     return res.status(403).json({
          //       errCode: 403,
          //       message: "Access denied. You are not authorized to view this user's data."
          //     });
          //   }
        
            let result = await scheduleService.updateSchedule(scheduleId);
            if (result.errCode == 0) {
           
              return res.status(200).json({
                errCode: 0,
                message: 'OK',
               
                schedule: result.updatedSchedule,
              });
            } else {
              return res.status(400).json({
                errCode: 400,
                message: 'Bad request'
              });
            }
          } catch (error) {
            console.error(error);
            return res.status(500).json({
              errCode: 4,
              message: 'Failed server'
            });
          }
        };
module.exports = {
     createSchedule: createSchedule,
     getScheduleByDoctorId:getScheduleByDoctorId,
     updateSchedule:updateSchedule,
 }