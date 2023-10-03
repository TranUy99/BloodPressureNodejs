'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.STRING
      },
      workDate: {
        type: Sequelize.STRING
      },
      doctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Doctors', // Name of the referenced table
          key: 'id'       // Primary key in the referenced table
        },
        onUpdate: 'CASCADE', // Update the foreign key value if referenced row changes
        onDelete: 'CASCADE'  // Delete the row if referenced row is deleted
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Status', // Name of the referenced table
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
    await queryInterface.dropTable('Schedules');
  }
};