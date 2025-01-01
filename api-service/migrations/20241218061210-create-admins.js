'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Admins', {
      admin_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      admin_first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      admin_last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      admin_date_of_birth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      admin_email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      admin_phone_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      admin_status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['ACTIVE', 'INACTIVE']]
        }
      },
      admin_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      admin_pin: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Admins');
  }
};

