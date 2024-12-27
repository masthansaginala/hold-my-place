'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vendors', {
      vendor_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      vendor_first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      vendor_gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_primary_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_address_line_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_address_line_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_zipcode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_pin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_admin_remarks: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_identification_number_type_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_identification_number_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_identification_proof_image_url_one: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      vendor_identification_number_type_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_identification_number_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_identification_proof_image_url_two: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable('Vendors');
  },
};

