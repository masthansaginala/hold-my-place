'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vendor_Businesses', {
      vendor_business_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Vendors',
          key: 'vendor_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      vendor_business_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_business_date_of_establishment: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      vendor_business_license_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_business_proof_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_business_proof_image_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      vendor_business_image_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      vendor_business_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_business_primary_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_business_secondary_phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_business_address_line_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_business_address_line_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_business_city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_business_state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_business_country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_business_zipcode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_business_service_category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      vendor_business_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      vendor_business_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_business_admin_remarks: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Vendor_Businesses');
  },
};

