'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // Association with User
      Booking.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      // Association with Event
      Booking.belongsTo(models.Event, {
        foreignKey: 'event_id',
        as: 'event',
      });
      // Association with Organizer
      Booking.belongsTo(models.Organizer, {
        foreignKey: 'organizer_id',
        as: 'organizer',
      });
    }
  }
  Booking.init(
    {
      booking_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      organizer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      booking_ticket_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      booking_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      booking_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      booking_checkin: {
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
      modelName: 'Booking',
      tableName: 'Bookings',
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  return Booking;
};
