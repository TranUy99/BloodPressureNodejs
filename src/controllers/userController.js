const userService = require('../services/userService');
const { sign } = require("jsonwebtoken");

//register
let register = async (req, res) => {
     let { email, fullName, password } = req.body;
   
     if (!email || !password || !fullName ) {
       return res.status(500).json({
         errCode: 1,
         message: 'Missing inputs parameter!'
       });
     }
   
     try {
       let userRegister = await userService.register(email, password, fullName);
       return res.status(200).json({
         errCode: userRegister.errCode,
         message: userRegister.errMessage,
         user: userRegister.user
       });
     } catch (error) {
       return res.status(500).json({
         errCode: -1,
         message: 'An error occurred while registering user!'
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
  
    let userData = await userService.handleUserLogin(email, password);
  
    if (userData && userData.user && userData.user.id) {
      const userId = userData.user.id;
      const token = sign({ userId:userId }, process.env.JWT_KEY, {
        expiresIn: "10h"
      });
  
      return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        token,
        idUser: userId
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
  
  //getUserByUserId
  let getUserByUserId = async (req, res) => {
    let userId = req.params.id;
    let token = req.decoded.userId;
    try {
      if (userId != token) {
        return res.status(403).json({
          errCode: 403,
          message: "Access denied. You are not authorized to view this user's data."
        });
      }
  
      let userById = await userService.getUserById(userId, token);
  
      if (userById) {
        const excludedFields = ['password', 'createdAt', 'updatedAt'];
        const filteredUser = excludeFields(userById, excludedFields);
  
        return res.status(200).json({
          errCode: 0,
          message: 'OK',
          user: filteredUser
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
  

  let updateUserData = async(req,res) =>{
    let userId = req.params.id;
    let token = req.decoded.userId;
    let data = req.body;
    try {
      if (userId != token) {
        return res.status(403).json({
          errCode: 403,
          message: "Access denied. You are not authorized to view this user's data."
        });
      }
  
      let userById = await userService.updateUserData(userId, token,data);
  
      if (userById) {
        const excludedFields = ['password', 'createdAt', 'updatedAt'];
        const filteredUser = excludeFields(userById, excludedFields);
  
        return res.status(200).json({
          errCode: 0,
          status:200,
          message: 'OK',
          user: filteredUser,
          
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
    getUserByUserId: getUserByUserId,
    updateUserData: updateUserData,
    excludeFields: excludeFields,
}