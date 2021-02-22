const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const blog = db.define('blog', {
  date: {
    type: Sequelize.DATEONLY
  },
  name: {
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
});



blog.sync().then(() => {
  console.log('table created');
});
module.exports = blog;
