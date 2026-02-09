'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE Bookings
        MODIFY COLUMN user_id INTEGER NOT NULL DEFAULT 0,
        MODIFY COLUMN hotel_id INTEGER NOT NULL DEFAULT 0;
      `
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
        ALTER TABLE Bookings
        MODIFY COLUMN user_id INTEGER,
        MODIFY COLUMN hotel_id INTEGER;
      `
    )
  }
};
