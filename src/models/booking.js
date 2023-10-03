'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
    }
  }
  Booking.init({
    userId: DataTypes.INTEGER,
    scheduleId: DataTypes.INTEGER,
    createDay: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};