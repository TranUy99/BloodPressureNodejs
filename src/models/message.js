'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

    static associate(models) {
    }
  }
  Message.init({
    
    chatId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    senderType: DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};