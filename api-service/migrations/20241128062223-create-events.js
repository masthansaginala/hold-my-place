'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      event_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      organizer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Organizers',
          key: 'organizer_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      event_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      event_total_seats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      event_seats_left: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      event_days_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      event_time: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      event_end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      event_timings: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_food: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_transportation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_accommodation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_ticket_price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      event_delivery_language: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_age_limit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_guests: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_discount: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_ticket_filling_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_early_bird_offer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_address_line_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_address_line_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_zipcode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_image_url_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_image_url_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_image_url_three: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  },
};

