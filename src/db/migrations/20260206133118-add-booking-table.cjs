'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
        CREATE TABLE Bookings(
        booking_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        hotel_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
        DROP TABLE Bookings;
      `
    )
  }
};
