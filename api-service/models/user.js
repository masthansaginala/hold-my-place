'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      user_gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_address_line_one: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_address_line_two: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_zipcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_pin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_status: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: 'User',
      tableName: 'Users',
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  return User;
};
