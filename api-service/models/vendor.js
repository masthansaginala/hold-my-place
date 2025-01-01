'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    static associate(models) {
      // define association here
    }
  }
  Vendor.init(
    {
      vendor_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      vendor_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor_last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      vendor_gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor_primary_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor_address_line_one: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_address_line_two: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_zipcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor_pin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendor_admin_remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_identification_number_type_one: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_identification_number_one: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_identification_proof_image_url_one: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      vendor_identification_number_type_two: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_identification_number_two: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendor_identification_proof_image_url_two: {
        type: DataTypes.TEXT,
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
      modelName: 'Vendor',
      tableName: 'Vendors',
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  return Vendor;
};
