'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event_Service extends Model {
    static associate(models) {
      // Association with Event
      Event_Service.belongsTo(models.Event, {
        foreignKey: 'event_id',
        as: 'event',
      });
      // Association with Organizer
      Event_Service.belongsTo(models.Organizer, {
        foreignKey: 'organizer_id',
        as: 'organizer',
      });
      // Associate with Vendor
      Event_Service.belongsTo(models.Vendor, {
        foreignKey: 'vendor_id',
        as: 'vendor',
      });
      // Association with Vendor_Business
      Event_Service.belongsTo(models.Vendor_Business, {
        foreignKey: 'vendor_business_id',
        as: 'vendorBusiness',
      });
    }
  }
  Event_Service.init(
    {
      event_service_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      organizer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vendor_business_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      event_service_status_vendor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_service_status_organizer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_service_remarks_vendor: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      event_service_remarks_organizer: {
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
      modelName: 'Event_Service',
      tableName: 'Event_Services',
      underscored: true,
      paranoid: true,
    }
  );
  return Event_Service;
};

