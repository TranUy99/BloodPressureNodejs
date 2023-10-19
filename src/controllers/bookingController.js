
const bookingService = require('../services/bookingService');

const userController = require('./userController');
//create BloodPressure
let createBooking = async (req, res) => {
    
     let { userId, scheduleId ,createDay} = req.body;
   
     if (!userId || !scheduleId || !createDay) {
       return res.status(500).json({
         errCode: 1,
         message: 'Missing inputs parameter!'
       });
     }
   
     try {
       let createSchedule= await bookingService.createBooking(userId, scheduleId, createDay);
       return res.status(200).json({
         errCode: createSchedule.errCode,
         message: createSchedule.errMessage,
         schedule: createSchedule.schedule
       });
     } catch (error) {
       return res.status(500).json({
         errCode: -1,
         message: 'An error occurred while registering booking!'
       });
     }
};

const getBookingByUserId = async (req, res) => {
  let userId = req.params.id;
  let token = req.decoded.userId;
  try {
    if (userId != token) {
      return res.status(403).json({
        errCode: 403,
        message: "Access denied. You are not authorized to view this user's data."
      });
    }

    let result = await bookingService.getBookingByUserId(userId, token);

    if (result.errCode == 0) {
      const excludedFields = ['createdAt', 'updatedAt', 'userId', 'scheduleId'];

      // Hàm loại bỏ trường 'password' chỉ từ 'bookings.schedule.doctor' (nếu tồn tại)
      const removePasswordField = (item) => {
        if (item.schedule && item.schedule.doctor) {
          delete item.schedule.doctor.password;
        }
        return item;
      };

      // Lọc danh sách đặt lịch và loại bỏ trường 'password' từ 'bookings.schedule.doctor' (nếu tồn tại)
      const filteredBooking = result.bookings.map((item) => {
        const itemWithoutPassword = removePasswordField(item);
        return userController.excludeFields(itemWithoutPassword, excludedFields);
      });

      return res.status(200).json({
        errCode: 0,
        message: 'OK',
        bookings: filteredBooking,
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
     createBooking: createBooking,
     getBookingByUserId: getBookingByUserId,
}