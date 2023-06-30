'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
    }
  }
  User.init({
    id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    passWord: DataTypes.STRING,          
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    rodeId:DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};