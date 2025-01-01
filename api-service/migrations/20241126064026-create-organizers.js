'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Organizers', {
      organizer_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      organizer_first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizer_last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      organizer_gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizer_primary_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizer_secondary_phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_address_line_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_address_line_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_zipcode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizer_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizer_pin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizer_admin_remarks: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_identification_number_type_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_identification_number_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_identification_proof_image_url_one: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      organizer_identification_number_type_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_identification_number_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizer_identification_proof_image_url_two: {
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
    await queryInterface.dropTable('Organizers');
  },
};

