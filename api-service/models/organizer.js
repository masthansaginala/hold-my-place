'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organizer extends Model {
    static associate(models) {
      // define association here
    }
  }
  Organizer.init(
    {
      organizer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      organizer_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organizer_last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      organizer_gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organizer_primary_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organizer_secondary_phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_address_line_one: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_address_line_two: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_zipcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organizer_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organizer_pin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organizer_admin_remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_identification_number_type_one: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_identification_number_one: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_identification_proof_image_url_one: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      organizer_identification_number_type_two: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_identification_number_two: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizer_identification_proof_image_url_two: {
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
      modelName: 'Organizer',
      tableName: 'Organizers',
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  return Organizer;
};
