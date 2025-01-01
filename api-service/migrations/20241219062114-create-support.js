'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Supports', {
      support_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      support_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      support_email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      support_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      support_type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['USER', 'ORGANIZER', 'VENDOR']],
        },
      },
      support_subject: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      support_message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      support_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending',
        validate: {
          isIn: [['Pending', 'In Progress', 'Resolved', 'Closed']],
        },
      },
      support_remarks: {
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
    await queryInterface.dropTable('Supports');
  },
};

