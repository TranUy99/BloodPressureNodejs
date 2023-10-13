const diseaseService = require('../services/diseaseService');
const { sign } = require("jsonwebtoken");

//register
let register = async (req, res) => {
     let { name, } = req.body;
   
    
   
     try {
       let diseaseRegister = await diseaseService.register(name,);
       return res.status(200).json({
         errCode: diseaseRegister.errCode,
         message: diseaseRegister.errMessage,
         disease: diseaseRegister.disease
       });
     } catch (error) {
       return res.status(500).json({
         errCode: -1,
         message: 'An error occurred while registering user!'
       });
     }
   };






module.exports = {
     register: register,
    
 }