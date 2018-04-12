// const validatePattern = require('../utils/validate-pattern');
import Sequelize from 'sequelize';

const sitePermissions = [
  'email',
  'delete',
  'create',
  'update',
  'read',
  'manageUsers',
  'manageMessages',
  'manageRoles',
  'manageSettings'
];

module.exports = function (app) {
  const sequelize = app.get('sequelizeClient');
  const Roles = sequelize.define(
    'Settings',
    {
      role: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
        trim: true
      },
      permissions: [
        {
          type: Sequelize.STRING,
          enum: sitePermissions
        }
      ]
    },
    {
      id: 'id',
      tableName: 'roles',
      createdAt: false,
      updatedAt: false
    }
  );
  return Roles;
};
