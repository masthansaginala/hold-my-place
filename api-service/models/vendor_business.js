'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor_Business extends Model {
    static associate(models) {
      // Associate with Vendor
    }
  }
  Vendor_Business.init(
    {
      vendor_business_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vendor_business_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor_business_date_of_establishment: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      vendor_business_license_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_business_proof_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_business_proof_image_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      vendor_business_image_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      vendor_business_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor_business_primary_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor_business_secondary_phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_business_address_line_one: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_business_address_line_two: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_business_city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_business_state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_business_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_business_zipcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_business_service_category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_business_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      vendor_business_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor_business_admin_remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: 'Vendor_Business',
      tableName: 'Vendor_Businesses',
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  return Vendor_Business;
};
