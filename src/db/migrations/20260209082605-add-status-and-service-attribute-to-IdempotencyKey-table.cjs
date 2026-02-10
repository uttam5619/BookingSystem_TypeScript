'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.sequelize.query(
    `
      ALTER TABLE IDEMPOTENCY_KEY
      ADD COLUMN status enum('pending','complete','cancelled')
      NOT NULL default 'pending',
      ADD COLUMN service VARCHAR(40) DEFAULT NULL,
      ADD COLUMN http_method ENUM('POST','GET','PATCH','PUT','DELETE') DEFAULT NULL;

    `
   )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
    `
      ALTER TABLE IDEMPOTENCY_KEY
      DROP COLUMN status,
      DROP COLUMN service,
      DROP COLUMN http_method;
    `
    )
  }
};
