'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {

    static associate(models) {
    }
  }
  User.init({
    id: DataTypes.INTEGER,
    currentNumber: DataTypes.INTEGER,         
    maxNumber: DataTypes.INTEGER,
    date: DataTypes.DATE,
    typeType: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};