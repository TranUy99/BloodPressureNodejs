const express = require ("express");
const userController  = require ("../controllers/userController");
const { checkToken } = require("../token/token");
let router = express.Router();

let auth = (app) => {
    
 
    router.post('/api/register',userController.register);

    router.post('/api/login',userController.handleLogin);

    router.get('/api/user/:id',checkToken,userController.getUserByUserId);

    router.put('/api/user/:id', checkToken, userController.updateUserData);
    return app.use("/", router);
}

module.exports = auth;