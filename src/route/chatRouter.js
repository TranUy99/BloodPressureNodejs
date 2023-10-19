const express = require ("express");
const chatController  = require ("../controllers/chatController.js");

let router = express.Router();

let auth = (app) => {
    
 
    router.post('/api/accessChat',chatController.accessChat);

    return app.use("/", router);
}

module.exports = auth;