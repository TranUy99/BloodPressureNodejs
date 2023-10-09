const bloodPressureService = require('../services/bloodPressureService');

const userController = require('./userController');
//create BloodPressure
let createBloodPressure = async (req, res) => {
     let userId = req.params.id;
     let token = req.decoded.userId;
     let { sys, dia, pulse ,createDay} = req.body;
   
     if (!sys || !dia || !pulse) {
       return res.status(500).json({
         errCode: 1,
         message: 'Missing inputs parameter!'
       });
     }
   
     try {
       let createBlood = await bloodPressureService.createBloodPressure(userId, token, sys, dia, pulse,createDay);
       return res.status(200).json({
         errCode: createBlood.errCode,
         message: createBlood.errMessage,
         bloodPressure: createBlood.bloodPressure
       });
     } catch (error) {
       return res.status(500).json({
         errCode: -1,
         message: 'An error occurred while registering user!'
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

    let result = await bloodPressureService.getBloodPressureById(userId, token);
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

    let result = await bloodPressureService.getBloodPressureById(userId, token);
    if (result.errCode === 0) {
      const excludedFields = ['password', 'createdAt', 'updatedAt', 'userId'];
      const filteredUser = userController.excludeFields(result.user, excludedFields);
      const filteredBloodPressure = result.bloodPressure.map(item => {
        return userController.excludeFields(item, excludedFields);
      });

      const newResult = filteredBloodPressure.map(({ id, sys, dia, pulse }) => ({
        id,
        sys,
        dia,
        pulse
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

module.exports = {
     createBloodPressure: createBloodPressure,
     getBloodPressureByUserId: getBloodPressureByUserId,
     getBloodPressureByUserIdReverse: getBloodPressureByUserIdReverse,
 }