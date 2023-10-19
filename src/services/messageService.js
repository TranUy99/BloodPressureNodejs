const db = require('../models/index');

let sendMessage = async (chatId, content, senderType, ) => {

  try {
    let newMessage  = await  db.Message.create({
      chatId,
      content,
      senderType
    });

    return {
      errCode: 0,
      errMessage: 'Successfully!',
      messages: newMessage
    };
  } catch (error) {
    throw error;
  }
};

let getMessagesByChat = async (chatId) => {
  try {
    // Sử dụng Sequelize để truy vấn tất cả tin nhắn trong cuộc trò chuyện dựa trên chatId
    const messages = await db.Message.findAll({
      where: {
        chatId: chatId,
      },
    });

    // Map the raw data to a simplified format
    const simplifiedMessages = messages.map((message) => ({
      id: message.id,
      chatId: message.chatId,
      content: message.content,
      senderType: message.senderType,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    }));

    return simplifiedMessages;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  sendMessage: sendMessage,
  getMessagesByChat:getMessagesByChat
};
