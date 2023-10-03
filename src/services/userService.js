import db  from '../models/index'
const bcryptjs = require("bcryptjs");



let register = async (email, password, fullName, role) => {
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
      fullName,
      role
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


let handleUserLogin = async (email, password) => {
  try {
    let userData = {};
    let isExist = await checkUserEmail(email);
    if (isExist) {
      // User already exists
      let user = await db.User.findOne({
        attributes: ['id', 'email', 'password'], // Include 'id' in the attributes
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
        } else {
          userData.errCode = 3;
          userData.errMessage = 'Wrong password';
        }
      } else {
        userData.errCode = 2;
        userData.errMessage = `User not found`;
      }
    } else {
      // Return error
      userData.errCode = 1;
      userData.errMessage = `Your email isn't exist in our system, please try another email`;
    }
    return userData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

let getUserById = async (userId, token) => {
  try {
    if (userId != token) {
      return { success: 0 };
    }

    let user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    });

    return user;
  } catch (e) {
    throw e;
  }
};

let updateUserData = async (userId,token,data) => {

  try {
    if (userId != token) {
      return { success: 0 };
    } else {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: false,
      });

      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;

        await user.save();
                let allUsers = await db.User.findOne({
                  where: { id: userId },
                  raw: true,
                });
                return allUsers;
      }
    }
  } catch (error) {
    throw error;
  }
};

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
  getUserById: getUserById,
  updateUserData:updateUserData
};