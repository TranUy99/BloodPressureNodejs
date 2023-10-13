'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BloodPressures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SystolicPressure: {
        type: Sequelize.DOUBLE
      },
      DiastolicPressure: {
        type: Sequelize.DOUBLE
      },
      PulsePressure: {
        type: Sequelize.DOUBLE
      },
      HeartRate: {
        type: Sequelize.DOUBLE
      },
      BodyTemperature: {
        type: Sequelize.DOUBLE
      },
      Disease: {
        type: Sequelize.STRING
      },
      createDay:{
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Name of the referenced table
          key: 'id'       // Primary key in the referenced table
        },
        onUpdate: 'CASCADE', // Update the foreign key value if referenced row changes
        onDelete: 'CASCADE'  // Delete the row if referenced row is deleted
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BloodPressures');
  }
};