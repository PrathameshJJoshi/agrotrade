const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const scheme = db.define('scheme', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
});



scheme.sync().then(() => {
  console.log('table created');
});
module.exports = scheme;
