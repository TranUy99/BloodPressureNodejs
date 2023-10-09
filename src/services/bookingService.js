const db  = require( '../models/index')

const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Ho_Chi_Minh'); // Đặt múi giờ mặc định là múi giờ của bạn

// Chuyển đổi ngày và giờ thành múi giờ mong muốn

let createBooking = async (userId, scheduleId, createDay) => {
     try {
       // Kiểm tra xem người dùng đã có lịch đặt trùng với scheduleId hay chưa
       const existingBooking = await db.Booking.findOne({
         where: { userId, scheduleId },
       });
   
       if (existingBooking) {
         return {
           errCode: 1,
           errMessage: 'The user already has a booking for this schedule.',
         };
       }
   
       let newBooking = await db.Booking.create({
         userId,
         scheduleId,
         createDay,
       });
   
       // Sau khi tạo đặt lịch thành công, cập nhật giá trị statusId trong bảng Schedule thành 2
       await db.Schedule.update(
         { statusId: 2 }, // Giá trị mới của statusId
         { where: { id: scheduleId } } // Điều kiện để xác định lịch cần cập nhật
       );
   
       return {
         errCode: 0,
         errMessage: 'Booking created successfully!',
         bloodPressure: newBooking,
       };
     } catch (error) {
       console.error(error); // Ghi log lỗi
       throw error;
     }
   };
   


   let getBookingByUserId = async (userId, token) => {
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
   
       let bookings = await db.Booking.findAll({
         where: { userId: userId },
         raw: true,
       });
   
       // Lặp qua từng đặt lịch để lấy thông tin chi tiết từ bảng Schedule
       for (const booking of bookings) {
         const scheduleId = booking.scheduleId;
   
         // Thực hiện truy vấn để lấy thông tin lịch từ bảng Schedule
         const schedule = await db.Schedule.findOne({
           where: { id: scheduleId },
           raw: true,
         });
   
         if (schedule) {
           // Thêm thông tin lịch vào đối tượng đặt lịch
           booking.schedule = schedule;
         }
       }
   
       return { errCode: 0, message: "OK", bookings: bookings };
     } catch (e) {
       throw e;
     }
   };
   
   
module.exports ={
     createBooking: createBooking,
     getBookingByUserId:getBookingByUserId,
}