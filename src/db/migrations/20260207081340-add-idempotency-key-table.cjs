'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
        CREATE TABLE IDEMPOTENCY_KEY(
          id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
          idempotency_key VARCHAR(50) UNIQUE,
          booking_id INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY(booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE ON UPDATE CASCADE
        );
      `
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
        DROP TABLE IDEMPOTENCY_KEY;
      `
    )
  }
};
