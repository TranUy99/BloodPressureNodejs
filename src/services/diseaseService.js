const db  = require( '../models/index')
const bcryptjs = require("bcryptjs");



let register = async (name,) => {
  try {


   

    let newDisease  = await  db.Diseases.create({
     name,
     

    });
    return {
      errCode: 0,
      errMessage: 'User registered successfully!',
      disease: newDisease
    };
  } catch (error) {
    throw error;
  }
};


module.exports = {
     register: register,
    
   };