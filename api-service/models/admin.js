'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // Define associations if required
    }
  }

  Admin.init(
    {
      admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      admin_first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      admin_last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      admin_date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
      },
      admin_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      admin_phone_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      admin_status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['ACTIVE', 'INACTIVE']]
        }
      },
      admin_password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      admin_pin: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Admin',
      tableName: 'Admins',
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );

  return Admin;
};
