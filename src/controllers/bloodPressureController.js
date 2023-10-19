const bloodPressureService = require('../services/bloodPressureService');
const { spawn } = require('child_process');
const userController = require('./userController');



//predict
const createBloodPressure = async (req, res) => {
  const userId = req.params.id;
  const token = req.decoded.userId;
  const {
    SystolicPressure,
    DiastolicPressure,
    PulsePressure,
    HeartRate,
    BodyTemperature,
    createDay
  } = req.body;

  if (!SystolicPressure || !DiastolicPressure || !PulsePressure || !HeartRate || !BodyTemperature) {
    return res.status(400).json({
      errCode: 1,
      message: 'Missing input parameters!'
    });
  }

  try {
    const childPython = spawn('python', ['loadXgboot.py', SystolicPressure, DiastolicPressure, PulsePressure, HeartRate, BodyTemperature]);

    childPython.stdout.on('data', async (data) => {
      const Disease = parseFloat(data.toString('utf8').trim()); // Converts the string to a floating-point number
      try {
        const createBlood = await bloodPressureService.createBloodPressure(userId, token, SystolicPressure, DiastolicPressure, PulsePressure, HeartRate, BodyTemperature, Disease, createDay);
        return res.status(200).json({
          errCode: createBlood.errCode,
          message: createBlood.errMessage,
          bloodPressure: createBlood.bloodPressure
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          errCode: -1,
          message: 'An error occurred while registering blood pressure!'
        });
      }
    });

    childPython.stderr.on('data', (data) => {
      const pythonError = data.toString('utf8');
      console.error('Python stderr:', pythonError);
      return res.status(500).json({
        error: 'Python script execution error'
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Python script execution error'
    });
  }
};
//get BloodPressure By UserId
let getBloodPressureByUserId = async (req, res) => {
  let userId = req.params.id;
  let token = req.decoded.userId;
  const no = req.query.no ? Number(req.query.no) : 0;
  const limit = req.query.limit ? Number(req.query.limit) : 100;

  try {
    if (userId != token) {
      return res.status(403).json({
        errCode: 403,
        message: "Access denied. You are not authorized to view this user's data."
      });
    }

    let result = await bloodPressureService.getBloodPressureByUserId(userId, token);
    if (result.errCode == 0) {
      const excludedFields = ['password', 'createdAt', 'updatedAt', 'userId'];
      const filteredUser = userController.excludeFields(result.user, excludedFields);
      const filteredBloodPressure = result.bloodPressure.map(item => {
        return userController.excludeFields(item, excludedFields);
      });

      const startIndex = no * limit;
      const endIndex = Math.min(startIndex + limit, filteredBloodPressure.length);
      const paginatedData = filteredBloodPressure.slice(startIndex, endIndex);

      const totalPages = Math.ceil(filteredBloodPressure.length / limit);

      return res.status(200).json({
        errCode: 0,
        message: 'OK',
        user: filteredUser,
        bloodPressure: paginatedData,
        totalPages: totalPages,
        totalItem: filteredBloodPressure.length,
        no: no,
        limit: limit,
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

// getBloodPressureByUserIdR đảo ngược 

let getBloodPressureByUserIdReverse = async (req, res) => {
  let userId = req.params.id;
  let token = req.decoded.userId;
  const no = req.query.no ? Number(req.query.no) : 0;
  const limit = req.query.limit ? Number(req.query.limit) : 100;

  try {
    if (userId != token) {
      return res.status(403).json({
        errCode: 403,
        message: "Access denied. You are not authorized to view this user's data."
      });
    }

    let result = await bloodPressureService.getBloodPressureByUserId(userId, token);
    if (result.errCode === 0) {
      const excludedFields = ['password', 'createdAt', 'updatedAt', 'userId'];
      const filteredUser = userController.excludeFields(result.user, excludedFields);
      const filteredBloodPressure = result.bloodPressure.map(item => {
        return userController.excludeFields(item, excludedFields);
      });

      const newResult = filteredBloodPressure.map(({ id, SystolicPressure, DiastolicPressure, PulsePressure,
        HeartRate,BodyTemperature,Disease,createDay
      }) => ({
        id,
        SystolicPressure,
        DiastolicPressure,
        PulsePressure,
        HeartRate,
        BodyTemperature,
        Disease,
        createDay
      })).reverse();

      const totalPages = Math.ceil(newResult.length / limit);
      const startIndex = no * limit;
      const endIndex = Math.min(startIndex + limit, newResult.length);
      const paginatedData = newResult.slice(startIndex, endIndex);

      return res.status(200).json({
        errCode: 0,
        message: 'OK',
        user: filteredUser,
        bloodPressure: paginatedData,
        totalPages: totalPages,
        totalItem: newResult.length,
        no: no,
        limit: limit,
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
let getBloodById = async (req,res) => {
  let bloodId = req.params.id;
  
  try {
  //   if (doctorId != token) {
  //     return res.status(403).json({
  //       errCode: 403,
  //       message: "Access denied. You are not authorized to view this user's data."
  //     });
  //   }

    let result = await bloodPressureService.getBloodById(bloodId,);
    if (result.errCode == 0) {
     
      const response = {
        errCode: 0,
        message: 'OK',
        bloodPressure: result.bloodPressure,
      };
    
      return res.status(200).json(response);
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
     createBloodPressure: createBloodPressure,
     getBloodPressureByUserId: getBloodPressureByUserId,
     getBloodPressureByUserIdReverse: getBloodPressureByUserIdReverse,
     getBloodById: getBloodById,
 }