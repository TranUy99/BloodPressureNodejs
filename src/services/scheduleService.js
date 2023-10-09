const db  = require( '../models/index')
// import schedule from '../models/schedule';

const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Ho_Chi_Minh'); // Đặt múi giờ mặc định là múi giờ của bạn



let createSchedule = async (doctorId, token, time, workDate, statusId) => {
     try {
       if (doctorId != token) {
         return { success: 0 };
       } else {
         // Kiểm tra xem đã tồn tại lịch với workDate và time tương tự trong cơ sở dữ liệu
         const existingSchedule = await db.Schedule.findOne({
           where: { workDate, time },
         });
   
         if (existingSchedule) {
           return {
             errCode: 1,
             errMessage: 'A schedule with the same workDate and time already exists.',
           };
         }
   
         let newSchedule = await db.Schedule.create({
           time,
           workDate,
           statusId,
           doctorId: doctorId,
         });
   
         return {
           errCode: 0,
           errMessage: 'Schedule created successfully!',
           schedule: newSchedule,
         };
       }
     } catch (error) {
       console.error(error); // Ghi log lỗi
       throw error;
     }
   };
   
   let getScheduleByDoctorId = async (doctorId, workDate) => {
     try {
     //   if (doctorId != token) {
     //     return { errCode: 403, message: "Access denied. You are not authorized to view this user's data." };
     //   }
   
       let doctor = await db.Doctor.findOne({
         where: { id: doctorId },
         raw: true,
       });
   
       if (!doctor) {
         return { errCode: 404, message: "User not found." };
       }
   
       let schedule = await db.Schedule.findAll({
         where: { doctorId: doctorId, workDate: workDate  ,statusId: { [db.Sequelize.Op.ne]: 2 }},
         raw: true,
       });
   
       return { errCode: 0, message: "OK", schedule: schedule };
     } catch (e) {
       throw e;
     }
   };
   
   let updateSchedule = async (scheduleId) => {
     try {
       let schedule = await db.Schedule.findOne({
         where: { id: scheduleId },
         raw: false,
       });
   
       if (schedule) {
         // Kiểm tra trạng thái hiện tại và cập nhật theo yêu cầu
         if (schedule.statusId == 1) {
           schedule.statusId = 2;
         } else if (schedule.statusId == 2) {
           schedule.statusId = 1;
         }
   
         await schedule.save();
   
         let updatedSchedule = await db.Schedule.findOne({
           where: { id: scheduleId },
           raw: true,
         });
   
         return { errCode: 0, message: "OK",updatedSchedule: updatedSchedule };
       }
     } catch (error) {
       console.error(error); 
       throw error;
     }
   };
   

   module.exports = {
     createSchedule: createSchedule,  
     getScheduleByDoctorId: getScheduleByDoctorId,
     updateSchedule: updateSchedule,
};