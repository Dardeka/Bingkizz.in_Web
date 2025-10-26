'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Products', 'productDesc', {
      type: Sequelize.STRING, // Sesuaikan tipe data
      allowNull: true,       // Boleh bernilai NULL (sesuai kebutuhan Anda)
      // defaultValue: 'Tidak ada deskripsi' // Opsional: Tambahkan nilai default
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Products', 'productDesc');
  }
};
