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
        allowNull: false, // Possible values: 'pending', 'confirmed', 'cancelled', 'completed'
      },
      booking_checkin: {
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
    await queryInterface.dropTable('Bookings');
  },
};

