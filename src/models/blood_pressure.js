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
    SystolicPressure: DataTypes.DOUBLE,
    DiastolicPressure: DataTypes.DOUBLE,          
    PulsePressure: DataTypes.DOUBLE,
    HeartRate: DataTypes.DOUBLE,          
    BodyTemperature: DataTypes.DOUBLE,
    Disease: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    createDay: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'BloodPressure',
  });
  return BloodPressure;
};