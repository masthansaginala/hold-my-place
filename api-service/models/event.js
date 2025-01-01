'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // Association with Organizer
      Event.belongsTo(models.Organizer, {
        foreignKey: 'organizer_id',
        as: 'organizer',
      });
    }
  }
  Event.init(
    {
      event_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      organizer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      event_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      event_total_seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      event_seats_left: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      event_days_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      event_time: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      event_end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      event_timings: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_food: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_transportation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_accommodation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_ticket_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      event_delivery_language: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_age_limit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_guests: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_discount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_ticket_filling_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_early_bird_offer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_address_line_one: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_address_line_two: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_zipcode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_image_url_one: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_image_url_two: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      event_image_url_three: {
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
      modelName: 'Event',
      tableName: 'Events',
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
  return Event;
};
