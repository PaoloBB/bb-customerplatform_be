import sequelize from 'feathers-sequelize';
import hooks from './hooks';
import OrganizationsModelFactory from '../../models/organizations';
import filters from './filters';

export default function userService() {
  const app = this;
  const options = {
    name: 'organizations',
    Model: OrganizationsModelFactory(app),
    paginate: {
      default: 10,
      max: 25
    }
  };

  app.use('/organizations', sequelize(options));
  const service = app.service('organizations');
  service.hooks(hooks);
  if (service.filter) {
    service.filter(filters);
  }
}
