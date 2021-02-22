const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const farm_type = db.define('farm_type', {
  type: {
    type:   Sequelize.STRING
  },
});



farm_type.sync().then(() => {
  console.log('table created');
});
module.exports = farm_type;
