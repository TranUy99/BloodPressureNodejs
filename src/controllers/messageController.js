const messageService = require('../services//messageService');


let sendMessage = async (req, res) => {
     let { chatId, content, senderType } = req.body; // Lấy chatId, content, và senderType từ body của request
   
     if (!chatId || !content || !senderType) {
       return res.status(400).json({
         errorCode: 1,
         message: 'Missing chatId, content, or senderType!',
       });
     }
   
     try {
       const messages = await messageService.sendMessage(chatId, content, senderType);
   
       return res.status(200).json({
          errCode: messages.errCode,
          message: messages.errMessage,
          content: messages.messages
        });
     } catch (error) {
       return res.status(500).json({
         errorCode: -1,
         message: 'An error occurred while sending the message!',
       });
     }
   };
   

   let getMessagesByChat = async (req, res) => {
     let { chatId } = req.query; 
   
     try {
       const messages = await messageService.getMessagesByChat(chatId);
      console.log(messages);
       return res.status(200).json({
         errorCode: 0,
         message: 'Success',
         messages: messages,
       });
     } catch (error) {
       return res.status(500).json({
         errorCode: -1,
         message: 'An error occurred while fetching messages!',
       });
     }
   };
   
module.exports = {
     sendMessage: sendMessage,
     getMessagesByChat: getMessagesByChat
 }