'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      booking_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Events',
          key: 'event_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      booking_event_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      booking_ticket_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      booking_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      booking_status: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      booking_checkin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      booking_event_certificate_image_url: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Bookings');
  },
};

