'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {

    static associate(models) {
    }
  }
  Schedule.init({
     time: DataTypes.STRING,
     workDate: DataTypes.STRING,          
     doctorId: DataTypes.INTEGER,
     statusId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};