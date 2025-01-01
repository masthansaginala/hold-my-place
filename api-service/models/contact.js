'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      // Define associations if required
    }
  }

  Contact.init(
    {
      contact_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      contact_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      contact_subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact_message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contact_status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Pending', 'In Progress', 'Resolved', 'Closed']],
        },
      },
      contact_remarks: {
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
      modelName: 'Contact',
      tableName: 'Contacts',
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  return Contact;
};
