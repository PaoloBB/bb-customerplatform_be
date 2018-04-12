// Initializes the `settings` service on path `/settings`
import service from 'feathers-sequelize';
import RolesModelFactory from '../../models/roles';
import hooks from './hooks';
import filters from './filters';

export default function rolesService() {
  const app = this;
  const Model = RolesModelFactory(app);
  const options = {
    name: 'roles',
    Model
  };
  app.use('/roles', service(options));
  const roles = app.service('roles');
  roles.hooks(hooks);

  if (roles.filter) {
    roles.filter(filters);
  }
}
