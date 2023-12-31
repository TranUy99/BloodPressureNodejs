'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
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
          key: 'id'      
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE' 
      },
      doctorId: {
          type: Sequelize.INTEGER,
        references: {
          model: 'Doctors', 
          key: 'id'       
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Chats');
  }
};