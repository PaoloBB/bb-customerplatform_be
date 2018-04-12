// const validatePattern = require('../utils/validate-pattern');
import Sequelize from 'sequelize';

module.exports = function (app) {
  const sequelize = app.get('sequelizeClient');
  const Settings = sequelize.define(
    'Settings',
    {
      name: Sequelize.STRING,
      value: Sequelize.STRING
    },
    {
      id: 'id',
      tableName: 'settings',
      createdAt: false,
      updatedAt: false
    }
  );
  return Settings;
};
