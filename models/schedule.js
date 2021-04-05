const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Schedule = sequelize.define('schedule', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  schedule: {
    type: Sequelize.STRING
  },
  active: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Schedule;