import Sequelize from 'sequelize';

module.exports = function (app) {
  const sequelize = app.get('sequelizeClient');
  const Organizations = sequelize.define(
    'Organizations',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING
    },
    {
      id: 'id',
      tableName: 'organizations',
      createdAt: false,
      updatedAt: false
    }
  );
  return Organizations;
};
