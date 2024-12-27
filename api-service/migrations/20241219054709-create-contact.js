'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contacts', {
      contact_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      contact_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact_email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      contact_subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact_message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      contact_status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['Pending', 'In Progress', 'Resolved', 'Closed']],
        },
      },
      contact_remarks: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contacts');
  },
};

