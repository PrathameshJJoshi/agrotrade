const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const history = db.define('history', {
  user_id: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.DATEONLY
  },
  product_list: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.STRING
  },
  razorpay_payment_id: {
    type: Sequelize.STRING
  },
  razorpay_order_id: {
    type: Sequelize.STRING
  },
  razorpay_signature: {
    type: Sequelize.TEXT
  }
});



history.sync().then(() => {
  console.log('table created');
});
module.exports = history;
