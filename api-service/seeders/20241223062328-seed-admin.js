'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin123', 10); // Hash the password
    return queryInterface.bulkInsert('Admins', [
      {
        admin_id: 1,
        admin_first_name: 'John',
        admin_last_name: 'Doe',
        admin_date_of_birth: '1990-01-01',
        admin_email: 'holdmyplaceinfo@gmail.com',
        admin_phone_number: '1234567890',
        role: 'ADMIN',
        admin_status: 'ACTIVE',
        admin_password: hashedPassword,
        admin_pin: 123456,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Admins', { admin_email: 'holdmyplaceinfo@gmail.com' }, {});
  }
};
