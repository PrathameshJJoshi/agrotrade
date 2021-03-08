const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const history = db.define('history', {
  user_id: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATEONLY
  },
  product_list: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.INTEGER
  },
  razorpay_paymentid: {
    type: Sequelize.STRING
  }
});



history.sync().then(() => {
  console.log('table created');
});
module.exports = history;
