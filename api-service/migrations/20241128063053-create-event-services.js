'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Event_Services', {
      event_service_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
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
      vendor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Vendors',
          key: 'vendor_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      vendor_business_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Vendor_Businesses',
          key: 'vendor_business_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      event_service_status_vendor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_service_status_organizer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_service_remarks_vendor: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      event_service_remarks_organizer: {
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
    await queryInterface.dropTable('Event_Services');
  },
};

