const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const cart = db.define('cart', {
  user_id: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.DATEONLY
  },
  crop_name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  image: {
    type: Sequelize.STRING
  },
});



cart.sync().then(() => {
  console.log('table created');
});
module.exports = cart;
