import doctorService from '../services/doctorService';
const { sign } = require("jsonwebtoken");
const userController = require('./userController');
//register
let register = async (req, res) => {
     let { email, fullName, password } = req.body;
   
     if (!email || !password || !fullName) {
       return res.status(500).json({
         errCode: 1,
         message: 'Missing inputs parameter!'
       });
     }
   
     try {
       let doctorRegister = await doctorService.register(email, password, fullName);
       return res.status(200).json({
         errCode: doctorRegister.errCode,
         message: doctorRegister.errMessage,
         doctor: doctorRegister.doctor
       });
     } catch (error) {
       return res.status(500).json({
         errCode: -1,
         message: 'An error occurred while registering doctor!'
       });
     }
   };

   //login
   let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
  
    if (!email || !password) {
      return res.status(500).json({
        errCode: 1,
        message: 'Missing inputs parameter!'
      });
    }
  
    let doctorData = await doctorService.handleDoctorLogin(email, password);
  
    if (doctorData && doctorData.doctor && doctorData.doctor.id) {
      const doctorId = doctorData.doctor.id;
      const token = sign({ doctorId:doctorId }, process.env.JWT_KEY, {
        expiresIn: "10h"
      });
  
      return res.status(200).json({
        errCode: doctorData.errCode,
        message: doctorData.errMessage,
        token,
        doctorId: doctorId
      });
    } else {
      return res.status(500).json({
        errCode: 4,
        message: 'Failed to generate token!'
      });
    }
  };
  let excludeFields = (object, excludedFields) => {
    const filteredObject = {};
    for (const key in object) {
      if (!excludedFields.includes(key)) {
        filteredObject[key] = object[key];
      }
    }
    return filteredObject;
  };
    //getDoctor
    let getDoctor = async (req, res) => {
      try {
        let result = await doctorService.getDoctor(); // Sử dụng hàm getDoctors để lấy danh sách các bác sĩ
    
        if (result.errCode==0) {
          const excludedFields = ['password', 'createdAt', 'updatedAt'];
          // const filteredDoctor = excludeFields(result.doctors, excludedFields);
          const filteredDoctors = result.doctors.map(item => {
            return excludeFields(item, excludedFields);
          });
    
          return res.status(200).json({
            errCode: 0,
            message: 'OK',
            doctors: filteredDoctors,
          });
        } else {
          return res.status(404).json({
            errCode: 1,
            message: "No doctors found",
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          errCode: 4,
          message: 'Failed to fetch doctors',
        });
      }
    };
    
  //getDoctorById
  let getDoctorById = async (req, res) => {
    let doctorId = req.params.id;
    let token = req.decoded.doctorId;
    try {
      if (doctorId != token) {
        return res.status(403).json({
          errCode: 403,
          message: "Access denied. You are not authorized to view this doctor's data."
        });
      }
  
      let doctorById = await doctorService.getDoctorById(doctorId, token);
  
      if (doctorById) {
        const excludedFields = ['password', 'createdAt', 'updatedAt'];
        const filteredDoctor = excludeFields(doctorById, excludedFields);
  
        return res.status(200).json({
          errCode: 0,
          message: 'OK',
          doctor: filteredDoctor
        });
      } else {
        return res.status(404).json({
          errCode: 1,
          message: "Record not found"
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        errCode: 4,
        message: 'Failed to generate token!'
      });
    }
  };
  

  let updateDoctorData = async(req,res) =>{
    let doctorId = req.params.id;
    let token = req.decoded.doctorId;
    let data = req.body;
    try {
      if (doctorId != token) {
        return res.status(403).json({
          errCode: 403,
          message: "Access denied. You are not authorized to view this doctor's data."
        });
      }
  
      let doctorById = await doctorService.updateDoctorData(doctorId, token,data);
  
      if (doctorById) {
        const excludedFields = ['password', 'createdAt', 'updatedAt'];
        const filteredDoctor = excludeFields(doctorById, excludedFields);
  
        return res.status(200).json({
          errCode: 0,
          status:200,
          message: 'OK',
          doctor: filteredDoctor,
          
        });
      } else {
        return res.status(404).json({
          errCode: 1,
          message: "Record not found"
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        errCode: 4,
        message: 'Failed to generate token!'
      });
    }
  }

  
  
  

module.exports = {
    register: register,
    handleLogin: handleLogin,
    getDoctor: getDoctor,
    getDoctorById: getDoctorById,
    updateDoctorData: updateDoctorData,
    excludeFields: excludeFields,
}