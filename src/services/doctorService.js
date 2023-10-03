import db  from '../models/index'
const bcryptjs = require("bcryptjs");



let register = async (email, password, fullName) => {
  try {
    const existingDoctor = await db.Doctor.findOne({
      where: { email: email }
    });

    if (existingDoctor) {
      return {
        errCode: 1,
        errMessage: 'Doctor with same email already exists!',
        doctor: null
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let newDoctor  = await  db.Doctor.create({
      email,
      password: hashedPassword,
      fullName,
      
    });
    return {
      errCode: 0,
      errMessage: 'Doctor registered successfully!',
      doctor: newDoctor
    };
  } catch (error) {
    throw error;
  }
};


let handleDoctorLogin = async (email, password) => {
  try {
    let doctorData = {};
    let isExist = await checkDoctorEmail(email);
    if (isExist) {
      // Doctor already exists
      let doctor = await db.Doctor.findOne({
        attributes: ['id', 'email', 'password'], // Include 'id' in the attributes
        where: { email: email },
        raw: true,
      });
      if (doctor) {
        let check = await bcryptjs.compare(password, doctor.password);
        if (check) {
          doctorData.errCode = 0;
          doctorData.errMessage = 'OK';

          delete doctor.password;
          doctorData.doctor = doctor;
        } else {
          doctorData.errCode = 3;
          doctorData.errMessage = 'Wrong password';
        }
      } else {
        doctorData.errCode = 2;
        doctorData.errMessage = `Doctor not found`;
      }
    } else {
      // Return error
      doctorData.errCode = 1;
      doctorData.errMessage = `Your email isn't exist in our system, please try another email`;
    }
    return doctorData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

let getDoctorById = async (doctorId, token) => {
  try {
    if (doctorId != token) {
      return { success: 0 };
    }

    let doctor = await db.Doctor.findOne({
      where: { id: doctorId },
      raw: true,
    });

    return doctor;
  } catch (e) {
    throw e;
  }
};

let getDoctor = async () => {
  try {
    const doctors = await db.Doctor.findAll({
  
      raw: true,
    });
  
    return { errCode: 0, message: "OK",doctors: doctors};
  } catch (e) {
    throw e;
  }
};


let updateDoctorData = async (doctorId,token,data) => {

  try {
    if (doctorId != token) {
      return { success: 0 };
    } else {
      let doctor = await db.Doctor.findOne({
        where: { id: doctorId },
        raw: false,
      });

      if (doctor) {
        doctor.firstName = data.firstName;
        doctor.lastName = data.lastName;

        await doctor.save();
                let allDoctors = await db.Doctor.findOne({
                  where: { id: doctorId },
                  raw: true,
                });
                return allDoctors;
      }
    }
  } catch (error) {
    throw error;
  }
};

let checkDoctorEmail = (doctorEmail) => {
  return new Promise(async (resolve, reject) => {
      try {
          let doctor = await db.Doctor.findOne({
              where: { email: doctorEmail }
          })
          if (doctor) {
              resolve(true)
          } else {
              resolve(false)
          }

      } catch (e) {
          reject(e)
      }
  })
}


module.exports = {
  register: register,
  handleDoctorLogin:handleDoctorLogin,
  getDoctor: getDoctor,
  getDoctorById: getDoctorById,
  updateDoctorData:updateDoctorData
};