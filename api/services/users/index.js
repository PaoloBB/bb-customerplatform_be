import sequelize from 'feathers-sequelize';
import hooks from './hooks';
import UsersModelFactory from '../../models/users';
import filters from './filters';

export default function userService() {
  const app = this;
  const options = {
    name: 'users',
    Model: UsersModelFactory(app),
    paginate: {
      default: 5,
      max: 25
    }
  };

  app.use('/users', sequelize(options));
  const service = app.service('users');
  service.hooks(hooks);
  if (service.filter) {
    service.filter(filters);
  }
}
