'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {

    static associate(models) {
    }
  }
  History.init({
    id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,         
    doctorId: DataTypes.INTEGER,
    description: DataTypes.TEXT, 
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};