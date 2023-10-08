'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {

    static associate(models) {
    }
  }
  Doctor.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,          
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    phoneNumber:DataTypes.STRING,
    image: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};