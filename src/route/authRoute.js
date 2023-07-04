import express from "express";
import userController from "../controllers/userController";
let router = express.Router();

let auth = (app) => {
    
 
    router.post('/api/register',userController.register);

    router.post('/api/login',userController.handleLoging);

    return app.use("/", router);
}

module.exports = auth;