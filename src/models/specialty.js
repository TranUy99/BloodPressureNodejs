'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {

    static associate(models) {
    }
  }
  specialty.init({
    id: DataTypes.INTEGER,
    description: DataTypes.TEXT,         
    image: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Specialty',
  });
  return Specialty;
};