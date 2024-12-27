'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Support extends Model {
    static associate(models) {
      // Define associations if required
    }
  }

  Support.init(
    {
      support_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      support_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      support_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      support_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      support_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['USER', 'ORGANIZER', 'VENDOR']],
        },
      },
      support_subject: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      support_message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      support_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending',
        validate: {
          isIn: [['Pending', 'In Progress', 'Resolved', 'Closed']],
        },
      },
      support_remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Support',
      tableName: 'Supports',
      timestamps: true,
      paranoid: true, // Enable soft delete
      underscored: true,
    }
  );

  return Support;
};
