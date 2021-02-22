const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const farm = db.define('farm', {
  type: {
    type:   Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
});



farm.sync().then(() => {
  console.log('table created');
});
module.exports = farm;
