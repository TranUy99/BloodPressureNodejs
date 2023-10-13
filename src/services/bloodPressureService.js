const db  = require( '../models/index')

const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Ho_Chi_Minh'); // Đặt múi giờ mặc định là múi giờ của bạn

// Chuyển đổi ngày và giờ thành múi giờ mong muốn
const diseaseMapping = {
  0: 'high stage 2 hypertension with high fever ',
  1: 'high stage 2 hypertension with mild fever ',
  2: 'high stage 2 hypertension',
  3: 'high stage 1 hypertension with high fever ',
  4: 'high stage 1 hypertension with mild fever ',
  5: 'high stage 1 hypertension',
  6: 'pre hypertension with high fever' ,
  7: 'pre hypertension with mild fever ',
  8: 'pre hypertension',
  9: 'normal with high fever ',
  10: 'normal with mild fever ',
  11: 'normal',
  12: 'low pressure with high fever',
  13: 'low pressure with mild fever ',
  14: 'low pressure',
};
let createBloodPressure = async (userId, token, SystolicPressure, DiastolicPressure, PulsePressure,HeartRate,BodyTemperature,Disease,createDay) => {
  
     try {
       if (userId != token) {
         return { success: 0 };
       } else {
         let newBlood = await db.BloodPressure.create({
          SystolicPressure,
          DiastolicPressure,
          PulsePressure,
          HeartRate,
          BodyTemperature,
          Disease: diseaseMapping[Disease] ,
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

   let getBloodPressureByUserId = async (userId, token) => {
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

  let getBloodById = async (bloodId, ) => {
    try {
      let blood = await db.BloodPressure.findOne({
        where: { id: bloodId },
        raw: true,
      });
  
      if (!blood) {
        return { errCode: 404, message: "Blood not found." };
      }
  
      let schedule = await db.BloodPressure.findAll({
        where: { id: bloodId},
        raw: true,
      });
  
      return { errCode: 0, message: "OK", schedule: schedule };
    } catch (e) {
      throw e;
    }
  };
module.exports = {
     createBloodPressure: createBloodPressure,  
     getBloodPressureByUserId: getBloodPressureByUserId,
     getBloodById: getBloodById,
};