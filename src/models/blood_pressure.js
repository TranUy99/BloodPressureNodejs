'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BloodPressure extends Model {

    static associate(models) {
    }
  }
  BloodPressure.init({
     sys: DataTypes.DOUBLE,
    dia: DataTypes.DOUBLE,          
    pulse: DataTypes.DOUBLE,
    userId: DataTypes.INTEGER,
    createDay: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'BloodPressure',
  });
  return BloodPressure;
};