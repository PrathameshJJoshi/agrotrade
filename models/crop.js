const Sequelize = require('sequelize');
// const base = require('react-native-base64')
const db = require('../config/database');

const crop = db.define('crop', {
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
  type: {
    type:   Sequelize.ENUM,
    values: ['Grain ','Fruit','Vegitable','Meat']
  },
  name: {
    type: Sequelize.STRING
  },
  mobile: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.TEXT
  },
});



crop.sync().then(() => {
  console.log('table created');
});
module.exports = crop;
