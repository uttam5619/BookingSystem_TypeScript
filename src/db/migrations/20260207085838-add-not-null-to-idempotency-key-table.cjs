'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.sequelize.query(
      `
      ALTER TABLE IDEMPOTENCY_KEY
      MODIFY COLUMN id INTEGER NOT NULL UNIQUE AUTO_INCREMENT;
      `
    ) 
  },

  async down (queryInterface, Sequelize) {
    `
    ALTER TABLE IDEMPOTENCY_KEY
    MODIFY COLUMN id INTEGER NOT NULL UNIQUE ;
    `
  }
};
