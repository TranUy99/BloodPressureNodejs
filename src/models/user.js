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
    email: DataTypes.STRING,
    password: DataTypes.STRING,          
    fullName: DataTypes.STRING,
    role: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    phoneNumber:DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};