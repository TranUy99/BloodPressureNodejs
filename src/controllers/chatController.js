const chatService = require('../services/chatService');


//accessChat
let accessChat = async (req, res) => {
     let { userId , doctorId } = req.body;
   
     if (!userId || !doctorId  ) {
       return res.status(500).json({
         errCode: 1,
         message: 'Missing inputs parameter!'
       });
     }
   
     try {
       let accessChat = await chatService.accessChat(userId, doctorId,);
       return res.status(200).json({
         errCode: accessChat.errCode,
         message: accessChat.errMessage,
         id: accessChat.chat.id
       });
     } catch (error) {
       return res.status(500).json({
         errCode: -1,
         message: 'An error occurred while !'
       });
     }
   };

   
module.exports = {
     accessChat: accessChat,
     
 }