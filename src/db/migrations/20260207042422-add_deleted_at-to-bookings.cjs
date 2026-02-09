'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE Bookings ADD COLUMN deleted_at DATE default NULL;
      `
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE Bookings DROP COLUMN deleted_at;
      `
    )
  }
};
