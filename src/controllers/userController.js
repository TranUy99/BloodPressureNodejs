import userService from '../services/userService';


//register
let register = async (req, res) => {
     let { email, firstName, lastName, password } = req.body;
   
     if (!email || !password || !firstName || !lastName) {
       return res.status(500).json({
         errCode: 1,
         message: 'Missing inputs parameter!'
       });
     }
   
     try {
       let userRegister = await userService.register(email, password, lastName, firstName);
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
   let handleLoging = async (req, res) => {
     let email = req.body.email;
     let password = req.body.password;
 
     if (!email || !password) {
         return res.status(500).json({
             errCode: 1,
             message: 'Missing inputs parameter!'
         })
     }
 
     let userData = await userService.handleUserLogin(email, password)
     //check email exist
     //password nhap vao ko dung
     //return userInfor
     // access_token :JWT json web token
 
     return res.status(200).json({
         errCode: userData.errCode,
         message: userData.errMessage,
         user: userData.user
     })
 }
 
module.exports = {
    register: register,
    handleLoging: handleLoging
}