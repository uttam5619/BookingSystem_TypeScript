'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE Bookings 
        ADD COLUMN booking_status ENUM('pending', 'confirmed', 'cancelled') 
        NOT NULL DEFAULT 'pending',
        ADD COLUMN booking_amount INTEGER NOT NULL default 0;
      `
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE Bookings
        DROP COLUMN booking_status
        DROP COLUMN booking_amount;
      `
    )
  }
};
