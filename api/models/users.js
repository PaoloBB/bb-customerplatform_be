import Sequelize from 'sequelize';

module.exports = function (app) {
  const sequelize = app.get('sequelizeClient');
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      isVerified: Sequelize.BOOLEAN,
      verifyToken: Sequelize.STRING,
      verifyExpires: Sequelize.DATE,
      verifyChanges: Sequelize.JSON,
      resetToken: Sequelize.STRING,
      resetExpires: Sequelize.DATE,
      role: Sequelize.STRING,
      isEnabled: Sequelize.BOOLEAN,
      idOrganization: Sequelize.INTEGER
    },
    {
      id: 'id',
      tableName: 'users',
      createdAt: false,
      updatedAt: false
    }
  );
  return Users;
};
