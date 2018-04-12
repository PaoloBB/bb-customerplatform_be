import sequelize from 'feathers-sequelize';
import hooks from './hooks';
import UsersModelFactory from '../../models/users';
import filters from './filters';

export default function userService() {
  const app = this;
  const options = {
    name: 'organizationUsers',
    Model: UsersModelFactory(app),
    paginate: {
      default: 10,
      max: 25
    }
  };

  app.use('/organization-users', sequelize(options));
  const service = app.service('organization-users');
  service.hooks(hooks);
  if (service.filter) {
    service.filter(filters);
  }
}
