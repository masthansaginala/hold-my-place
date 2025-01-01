'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      user_gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_address_line_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_address_line_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_zipcode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_pin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
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
    await queryInterface.dropTable('Users');
  },
};

