import authManagement from 'feathers-authentication-management';
import hooks from './hooks';
import notifier from './notifier';

export default function authenticationService() {
  const app = this;
  app.configure(authManagement(notifier(app)));
  app.service('authManagement').hooks(hooks);
}
