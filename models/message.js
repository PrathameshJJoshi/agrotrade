const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const message = db.define('message', {
  user_id: {
    type:   Sequelize.INTEGER
  },
  another_id: {
    type: Sequelize.INTEGER
  },
  messages: {
    type: Sequelize.TEXT
  },
});



message.sync().then(() => {
  console.log('table created');
});
module.exports = message;
