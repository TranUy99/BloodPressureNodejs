'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      scheduleId: {
          type: Sequelize.INTEGER,
        references: {
          model: 'Schedules', // Name of the referenced table
          key: 'id'       // Primary key in the referenced table
        },
        onUpdate: 'CASCADE', // Update the foreign key value if referenced row changes
        onDelete: 'CASCADE'
      },
      createDay:{
          type: Sequelize.STRING
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
    await queryInterface.dropTable('Bookings');
  }
};