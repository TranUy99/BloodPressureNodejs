const express = require ("express");
const messageController  = require ("../controllers/messageController.js");

let router = express.Router();

let auth = (app) => {
    
 
    router.post('/api/sendMessage',messageController.sendMessage);
    router.get('/api/getMessagesByChat',messageController.getMessagesByChat);
    return app.use("/", router);
}

module.exports = auth;