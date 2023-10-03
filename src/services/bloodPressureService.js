import db  from '../models/index'

const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Ho_Chi_Minh'); // Đặt múi giờ mặc định là múi giờ của bạn

// Chuyển đổi ngày và giờ thành múi giờ mong muốn

let createBloodPressure = async (userId, token, sys, dia, pulse,createDay) => {
  
     try {
       if (userId != token) {
         return { success: 0 };
       } else {
         let newBlood = await db.BloodPressure.create({
           sys,
           dia,
           pulse,
           userId,
           createDay,
         });
   
         return {
           errCode: 0,
           errMessage: 'BloodPressures created successfully!',
           bloodPressure: newBlood
         };
       }
     } catch (error) {
       console.error(error); // Log the error
       throw error;
     }
   };

   let getBloodPressureById = async (userId, token) => {
    try {
      if (userId != token) {
        return { errCode: 403, message: "Access denied. You are not authorized to view this user's data." };
      }
  
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
  
      if (!user) {
        return { errCode: 404, message: "User not found." };
      }
  
      let bloodPressure = await db.BloodPressure.findAll({
        where: { userId: userId },
        raw: true,
      });
  
      return { errCode: 0, message: "OK", user: user, bloodPressure: bloodPressure };
    } catch (e) {
      throw e;
    }
  };
  
module.exports = {
     createBloodPressure: createBloodPressure,  
     getBloodPressureById: getBloodPressureById,
};