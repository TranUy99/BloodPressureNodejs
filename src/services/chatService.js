const db  = require( '../models/index')

let accessChat = async (userId, doctorId) => {
  try {
    const [chat, created] = await db.Chat.findOrCreate({
      where: { userId: userId, doctorId: doctorId },
      defaults: { userId: userId, doctorId: doctorId }
    });

    if (created) {
      return {
        errCode: 0,
        errMessage: 'Chat created successfully!',
        chat: chat
      };
    } else {
      return {
        errCode: 1,
        errMessage: 'Chat already exists!',
        chat: chat
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  accessChat: accessChat
};


module.exports = {
     accessChat: accessChat,
};