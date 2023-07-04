import db  from '../models/index'
const bcryptjs = require("bcryptjs");



let register = async (email, password, lastName, firstName) => {
  try {
    const existingUser = await db.User.findOne({
      where: { email: email }
    });

    if (existingUser) {
      return {
        errCode: 1,
        errMessage: 'User with same email already exists!',
        user: null
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let newUser  = await  db.User.create({
      email,
      password: hashedPassword,
      lastName,
      firstName
    });
    return {
      errCode: 0,
      errMessage: 'User registered successfully!',
      user: newUser
    };
  } catch (error) {
    throw error;
  }
};


let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
      try {
          let userData = {};
          let isExist = await checkUserEmail(email);
          if (isExist) {
              //user already exist
              let user = await db.User.findOne({
                  attributes: ['email', 'password'],
                  where: { email: email },
                  raw: true,

              });
              if (user) {
                  
                  let check = await bcryptjs.compare(password, user.password);
                  if (check) {
                    userData.errCode = 0;
                    userData.errMessage = 'OK';

                    delete user.password;
                    userData.user = user;
                }
                else {
                    userData.errCode = 3;
                    userData.errMessage = 'Wrong password';
                }
              } else {
                  userData.errCode = 2;
                  userData.errMessage = `User not found`;
              }

          } else {
              //return error
              userData.errCode = 1;
              userData.errMessage = `Your's Email isn't exist in our system, plz try other email`
          }
          resolve(userData)
      } catch (e) {
          reject(e);
      }
  })
}
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
      try {
          let user = await db.User.findOne({
              where: { email: userEmail }
          })
          if (user) {
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
  handleUserLogin:handleUserLogin,
};