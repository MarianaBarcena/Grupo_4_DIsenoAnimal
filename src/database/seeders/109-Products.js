'use strict';

const productsJSON = require("../../data/productos.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const brands = await queryInterface.sequelize.query(
      `SELECT id, name FROM Brands;`
    );

    const filings = await queryInterface.sequelize.query(
      `SELECT id, measure FROM filings;`
    );

    const getForeignKey = (name, array) => {
      const item = array.find(item => item.name === name);
      return item ? item.id : null;
    };

    const products = productsJSON.map(product => ({
      name: product.name,
      price: product.price,
      discount: product.discount,
      description: product.description,
      brandId: getForeignKey(product.brand, brands[0]),
      specieId: product.species == "perro" ? 1 : product.flavor == "gato" ? 2 : product.flavor == "ave" ? 3  : product.flavor == "pez" ? 4 : product.flavor == "roedor" ? 5 :  6,
      filingId: getForeignKey(product.measure, filings[0]),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    return queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};