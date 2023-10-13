'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diseases extends Model {

    static associate(models) {
    }
  }
  Diseases.init({
     name: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Diseases',
  });
  return Diseases;
};