const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const comment = db.define('comment', {
  blog_id: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATEONLY
  },
  comments: {
    type: Sequelize.TEXT
  },
});



comment.sync().then(() => {
  console.log('table created');
});
module.exports = comment;
